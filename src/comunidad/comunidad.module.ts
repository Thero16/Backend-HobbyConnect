import { Module } from '@nestjs/common';
import { ComunidadService } from './comunidad.service';
import { ComunidadController } from './comunidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comunidad } from './entities/comunidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comunidad])],
  controllers: [ComunidadController],
  providers: [ComunidadService],
  exports: [ComunidadService]
})
export class ComunidadModule {} 