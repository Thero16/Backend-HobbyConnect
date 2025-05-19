import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comunidad } from './entities/comunidad.entity';
import { CreateComunidadDto } from './dto/create-comunidad.dto';
import { UpdateComunidadDto } from './dto/update-comunidad.dto';

@Injectable()
export class ComunidadService {
  constructor(
    @InjectRepository(Comunidad)
    private readonly comunidadRepository: Repository<Comunidad>,
  ) {}

  async create(createComunidadDto: CreateComunidadDto): Promise<Comunidad> {
    const comunidad = this.comunidadRepository.create({
      ...createComunidadDto,
      fecha_creacion: new Date(createComunidadDto.fecha_creacion),
    });
    return this.comunidadRepository.save(comunidad);
  }

  async findAll(): Promise<Comunidad[]> {
    return this.comunidadRepository.find({ relations: ['usuarios'] });
  }

  async findOne(id: string): Promise<Comunidad> {
    const comunidad = await this.comunidadRepository.findOne({ where: { id }, relations: ['usuarios'] });
    if (!comunidad) {
      throw new NotFoundException(`Comunidad con ID ${id} no encontrada`);
    }
    return comunidad;
  }

  async update(id: string, updateComunidadDto: UpdateComunidadDto): Promise<Comunidad> {
    const comunidad = await this.findOne(id);
    Object.assign(comunidad, updateComunidadDto);
    return this.comunidadRepository.save(comunidad);
  }

  async remove(id: string): Promise<void> {
    const comunidad = await this.findOne(id);
    await this.comunidadRepository.remove(comunidad);
  }
} 