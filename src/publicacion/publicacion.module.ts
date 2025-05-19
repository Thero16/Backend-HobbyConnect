// src/publicacion/publicacion.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicacionController } from './publicacion.controller';
import { PublicacionService } from './publicacion.service';
import { Publicacion } from './entities/publicacion.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Comunidad } from '../comunidad/entities/comunidad.entity';
import { AuthModule } from '../auth/auth.module'; // Importar AuthModule
import { CreadorPublicacionGuard } from './guards/creador-publicacion.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publicacion, Usuario, Comunidad]),
    AuthModule, // Importar AuthModule para tener acceso a JwtService y JwtAuthGuard
  ],
  controllers: [PublicacionController],
  providers: [PublicacionService, CreadorPublicacionGuard], // Añadir CreadorPublicacionGuard aquí
})
export class PublicacionModule {}