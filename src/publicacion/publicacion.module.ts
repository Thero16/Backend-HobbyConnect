import { Module } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { PublicacionController } from './publicacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Comunidad } from '../comunidad/entities/comunidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publicacion, Usuario, Comunidad])],
  controllers: [PublicacionController],
  providers: [PublicacionService],
  exports: [PublicacionService]
})
export class PublicacionModule {} 