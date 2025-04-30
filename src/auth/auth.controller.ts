
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body('correo') correo: string,
    @Body('contrasena') contrasena: string,
  ) {
    return this.authService.login(correo, contrasena);
  }
}
