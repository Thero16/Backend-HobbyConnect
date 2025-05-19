// src/publicacion/guards/creador-publicacion.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PublicacionService } from '../publicacion.service';

@Injectable()
export class CreadorPublicacionGuard implements CanActivate {
  constructor(private readonly publicacionService: PublicacionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Debug detallado
    console.log('User object in CreadorPublicacionGuard:', request.user);
    console.log('Headers:', request.headers);

    // Extracción robusta del ID de usuario
    const user = request.user ;
    const userId = user.sub;
    
    if (!userId) {
      console.error('Error: No se encontró ID de usuario en:', user);
      throw new ForbiddenException('Usuario no autenticado');
    }

    const publicacionId = request.params.id;
    if (!publicacionId) {
      throw new ForbiddenException('ID de publicación no proporcionado');
    }

    try {
      const esPropietario = await this.publicacionService.verificarPropiedad(publicacionId, userId);
      if (!esPropietario) {
        throw new ForbiddenException('No tienes permisos para esta acción');
      }
      return true;
    } catch (error) {
      console.error('Error en verificarPropiedad:', error);
      throw new ForbiddenException('Error al verificar propiedad');
    }
  }
}