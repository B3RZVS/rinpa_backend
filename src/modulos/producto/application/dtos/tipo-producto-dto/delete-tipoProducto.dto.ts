import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteTipoProductoDto {
  @IsInt()
  @Type(() => Number) // <-- Esta línea transforma string a number
  id: number;
}
