// src/comunidad/comunidad.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComunidadController } from './comunidad.controller';
import { ComunidadService } from './comunidad.service';
import { Comunidad } from './entities/comunidad.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comunidad]),
    AuthModule, // Importa AuthModule para acceder a JwtService
  ],
  controllers: [ComunidadController],
  providers: [ComunidadService],
})
export class ComunidadModule {}