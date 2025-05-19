import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createDto: CreatePublicacionDto): Promise<Publicacion> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: createDto.usuario_id } });
    const comunidad = await this.comunidadRepository.findOne({ where: { id: createDto.comunidad_id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    if (!comunidad) throw new NotFoundException('Comunidad no encontrada');
    const publicacion = this.publicacionRepository.create({
      ...createDto,
      usuario,
      comunidad,
      fecha_publicacion: new Date(createDto.fecha_publicacion),
      fecha_edicion: createDto.fecha_edicion ? new Date(createDto.fecha_edicion) : null,
    });
    return this.publicacionRepository.save(publicacion);
  }

  async findAll(): Promise<Publicacion[]> {
    return this.publicacionRepository.find({ relations: ['usuario', 'comunidad'] });
  }

  async findOne(id: string): Promise<Publicacion> {
    const publicacion = await this.publicacionRepository.findOne({ where: { id }, relations: ['usuario', 'comunidad'] });
    if (!publicacion) throw new NotFoundException('Publicacion no encontrada');
    return publicacion;
  }

  async update(id: string, updateDto: UpdatePublicacionDto): Promise<Publicacion> {
    const publicacion = await this.findOne(id);
    Object.assign(publicacion, updateDto);
    if (updateDto.fecha_edicion) {
      publicacion.fecha_edicion = new Date(updateDto.fecha_edicion);
    }
    return this.publicacionRepository.save(publicacion);
  }

  async remove(id: string): Promise<void> {
    const publicacion = await this.findOne(id);
    await this.publicacionRepository.remove(publicacion);
  }
} 