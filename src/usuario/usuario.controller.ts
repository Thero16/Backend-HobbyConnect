
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Crear un nuevo usuario
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  // Obtener todos los usuarios
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  // Obtener un usuario por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  // Actualizar un usuario por ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  // Eliminar un usuario por ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }

  //Agrega un nuevo hobby por ID
  @Patch(':id/hobbies')
  agregarHobby(
    @Param('id') id: string,
    @Body('hobby') hobby: string,
  ) {
    return this.usuarioService.agregarHobby(id, hobby);
  }
}
