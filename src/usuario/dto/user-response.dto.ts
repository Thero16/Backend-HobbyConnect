
export class UserResponseDto {
    id: string;
    nombre: string;
    correo: string;
    descripcion: string;
    fotoUrl?: string;  // Opcional, porque el usuario puede no tener una foto
    hobbies?: string[]; //Opcional
  }
  