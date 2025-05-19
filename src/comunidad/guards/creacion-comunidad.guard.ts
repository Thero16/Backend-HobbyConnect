
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class CreacionComunidadGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const creadorId = request.body.creada_por;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    // Verificamos que el usuario no esté intentando suplantar a otro
    if (creadorId && user.sub !== creadorId) {
      throw new ForbiddenException('No puedes crear una comunidad a nombre de otro usuario');
    }

    // Asignamos automáticamente el ID del usuario del JWT
    request.body.creada_por = user.sub;

    return true;
  }
}