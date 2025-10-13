import { IsEmail, IsNumber, IsString, Min, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MinLength(1)
  nombre: string;
  @IsString()
  @MinLength(1)
  apellido: string;

  @IsEmail()
  @MinLength(1)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsNumber()
  @Min(1)
  rolId: number;
}
