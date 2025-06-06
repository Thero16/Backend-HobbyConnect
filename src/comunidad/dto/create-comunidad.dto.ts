import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateComunidadDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsOptional()
  @IsString()
  creada_por?: string;

  @IsDateString()
  fecha_creacion: string;
} 