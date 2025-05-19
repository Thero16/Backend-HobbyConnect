
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ComunidadService } from '../comunidad.service';

@Injectable()
export class CreadorGuard implements CanActivate {
  constructor(private readonly comunidadService: ComunidadService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const comunidadId = request.params.id;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    const comunidad = await this.comunidadService.findOne(comunidadId);
    
    if (comunidad.creada_por !== user.sub) { // JWT standard usa 'sub' para el ID del usuario
      throw new ForbiddenException('Solo el creador de la comunidad puede realizar esta acción');
    }

    return true;
  }
}