// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../usuario/dto/user-response.dto'; // Importamos el DTO

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(correo: string, contrasena: string) {
    const usuario = await this.usuarioService.findByCorreo(correo);

    if (!usuario || !(await bcrypt.compare(contrasena, usuario.contrasena))) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const payload = { sub: usuario.id, correo: usuario.correo };

    // Creamos la respuesta usando el DTO
    const usuarioResponse: UserResponseDto = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      descripcion: usuario.descripcion,
      fotoUrl: usuario.fotoUrl,  
      hobbies: usuario.hobbies,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: usuarioResponse,
    };
  }
}
