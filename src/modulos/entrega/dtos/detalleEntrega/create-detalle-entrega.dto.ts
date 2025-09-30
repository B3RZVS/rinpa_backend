import { IsNumber } from 'class-validator';

export class CreateDetalleEntregaDTO {
  @IsNumber()
  cantidad: number;

  @IsNumber()
  precioUnitario: number;

  @IsNumber()
  productoId: number;
}
