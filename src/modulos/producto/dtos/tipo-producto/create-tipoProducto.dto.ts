import { IsString, MinLength } from 'class-validator';

export class CreateTipoProductoDto {
  @IsString()
  @MinLength(1)
  nombre: string;
}
