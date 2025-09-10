import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateClienteDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  nombre: string;

  @IsString()
  @MinLength(1)
  @MaxLength(80)
  apellido: string;

  @IsString()
  @MinLength(5) // ejemplo, adaptá según formato de teléfono
  @MaxLength(20)
  telefono: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  descripcion?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(200)
  direccion: string;
}
