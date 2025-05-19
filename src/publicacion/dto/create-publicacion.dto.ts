import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreatePublicacionDto {

  @IsString()
  @IsNotEmpty()
  comunidad_id: string;

  @IsString()
  @IsNotEmpty()
  contenido: string;


  @IsOptional()
  @IsDateString()
  fecha_edicion?: string;

  usuario_id?: string;
  fecha_publicacion?: Date;

} 