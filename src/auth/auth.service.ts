// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

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

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
