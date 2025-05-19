import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';

@Controller('publicacion')
export class PublicacionController {
  constructor(private readonly publicacionService: PublicacionService) {}

  @Post()
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
  update(@Param('id') id: string, @Body() updateDto: UpdatePublicacionDto) {
    return this.publicacionService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionService.remove(id);
  }
} 