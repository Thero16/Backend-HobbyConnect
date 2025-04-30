import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength,
    IsDateString,
    IsOptional,
  } from 'class-validator';
  
  export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
  
    @IsEmail()
    correo: string;
  
    @IsString()
    @MinLength(6)
    contrasena: string;
  
    @IsString()
    @IsOptional()
    descripcion: string;
  
    @IsString()
    @IsOptional()
    fotoUrl?: string;
  
    @IsDateString()
    fechaRegistro: string;
  }
  