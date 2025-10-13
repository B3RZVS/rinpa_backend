import { IsInt, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTipoProductoDto {
  @IsInt()
  @Type(() => Number) // <-- Esta línea transforma string a number
  id: number;
  @IsString()
  @MinLength(1)
  nombre: string;
}
