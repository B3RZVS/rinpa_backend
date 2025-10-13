import { IsNumber } from 'class-validator';

export class CreatePrecioNaftaDTO {
  @IsNumber()
  precio: number;
}
