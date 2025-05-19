import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreatePublicacionDto {
  @IsString()
  @IsNotEmpty()
  usuario_id: string;

  @IsString()
  @IsNotEmpty()
  comunidad_id: string;

  @IsString()
  @IsNotEmpty()
  contenido: string;

  @IsDateString()
  fecha_publicacion: string;

  @IsOptional()
  @IsDateString()
  fecha_edicion?: string;
} 