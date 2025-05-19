import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComunidadService } from './comunidad.service';
import { CreateComunidadDto } from './dto/create-comunidad.dto';
import { UpdateComunidadDto } from './dto/update-comunidad.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreacionComunidadGuard } from './guards/creacion-comunidad.guard';
import { CreadorGuard } from './guards/creador.guard';

@Controller('comunidad')
export class ComunidadController {
  constructor(private readonly comunidadService: ComunidadService) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreacionComunidadGuard)
  create(@Body() createComunidadDto: CreateComunidadDto) {
    return this.comunidadService.create(createComunidadDto);
  }

  @Get()
  findAll() {
    return this.comunidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunidadService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, CreadorGuard)
  update(@Param('id') id: string, @Body() updateComunidadDto: UpdateComunidadDto) {
    return this.comunidadService.update(id, updateComunidadDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, CreadorGuard)
  remove(@Param('id') id: string) {
    return this.comunidadService.remove(id);
  }
}