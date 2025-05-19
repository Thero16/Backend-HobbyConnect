import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PublicacionGuard } from './guards/publicacion.guard';
import { CreadorPublicacionGuard } from './guards/creador-publicacion.guard';

@Controller('publicacion')
export class PublicacionController {
  constructor(private readonly publicacionService: PublicacionService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PublicacionGuard)
  create(@Body() createDto: CreatePublicacionDto) {
    return this.publicacionService.create(createDto);
  }

  @Get()
  findAll() {
    return this.publicacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, CreadorPublicacionGuard)
  update(@Param('id') id: string, @Body() updateDto: UpdatePublicacionDto) {
    return this.publicacionService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, CreadorPublicacionGuard)
  remove(@Param('id') id: string) {
    return this.publicacionService.remove(id);
  }
}