import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Comunidad } from '../comunidad/entities/comunidad.entity';

@Injectable()
export class PublicacionService {
  constructor(
    @InjectRepository(Publicacion)
    private readonly publicacionRepository: Repository<Publicacion>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Comunidad)
    private readonly comunidadRepository: Repository<Comunidad>,
  ) {}

  async create(createPublicacionDto: CreatePublicacionDto): Promise<Publicacion> {
    // 1. Validación explícita del usuario_id
    if (!createPublicacionDto.usuario_id) {
      throw new Error('ID de usuario no proporcionado');
    }
  
    // 2. Buscar usuario - versión segura que falla si no existe
    const usuario = await this.usuarioRepository.findOneBy({ 
      id: createPublicacionDto.usuario_id 
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${createPublicacionDto.usuario_id} no existe`);
    }
  
    // 3. Buscar comunidad
    const comunidad = await this.comunidadRepository.findOneBy({ 
      id: createPublicacionDto.comunidad_id 
    });
    if (!comunidad) {
      throw new NotFoundException('Comunidad no encontrada');
    }
  
    // 4. Crear publicación - método alternativo seguro
    const publicacion = new Publicacion();
    publicacion.contenido = createPublicacionDto.contenido;
    publicacion.usuario = usuario; // Asignación directa
    publicacion.comunidad = comunidad;
    publicacion.fecha_publicacion = new Date();
  
    // 5. Debug final
    console.log('Usuario asignado:', publicacion.usuario.id);
    console.log('Comunidad asignada:', publicacion.comunidad.id);
  
    return this.publicacionRepository.save(publicacion);
  }

  async findAll(): Promise<Publicacion[]> {
    return this.publicacionRepository.find({ 
      relations: ['usuario', 'comunidad'],
      order: { fecha_publicacion: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Publicacion> {
    const publicacion = await this.publicacionRepository.findOne({ 
      where: { id }, 
      relations: ['usuario', 'comunidad'] 
    });
    if (!publicacion) throw new NotFoundException('Publicación no encontrada');
    return publicacion;
  }

  async update(id: string, updateDto: UpdatePublicacionDto): Promise<Publicacion> {
    const publicacion = await this.findOne(id);
    
    // Solo actualizar campos permitidos
    if (updateDto.contenido) {
      publicacion.contenido = updateDto.contenido;
      publicacion.fecha_edicion = new Date();
    }
    
    return this.publicacionRepository.save(publicacion);
  }

  async remove(id: string): Promise<void> {
    const publicacion = await this.findOne(id);
    await this.publicacionRepository.remove(publicacion);
  }

  async verificarPropiedad(publicacionId: string, usuarioId: string): Promise<boolean> {
    const publicacion = await this.publicacionRepository.findOne({
      where: { id: publicacionId },
      relations: ['usuario']
    });
    
    if (!publicacion) throw new NotFoundException('Publicación no encontrada');
    return publicacion.usuario.id === usuarioId;
  }
}