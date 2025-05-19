// src/publicacion/guards/publicacion.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

// src/publicacion/guards/publicacion.guard.ts
@Injectable()
export class PublicacionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Validación extrema del usuario
    if (!request.user || typeof request.user !== 'object') {
      throw new UnauthorizedException('Estructura de usuario inválida');
    }

    const userId = request.user.sub;
    if (!userId || typeof userId !== 'string') {
      throw new UnauthorizedException('ID de usuario no válido en el token');
    }

    // Asignación directa sin sobrescritura posible
    if (!request.body) request.body = {};
    request.body.usuario_id = userId;
    Object.freeze(request.body.usuario_id); // Previene modificaciones

    return true;
  }
}