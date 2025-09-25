import { IsNumber } from 'class-validator';

export class CreateEntregaDTO {
  @IsNumber()
  precio: number;
  @IsNumber()
  clienteId: number;
  @IsNumber()
  usuarioId: number;
  @IsNumber()
  precioNaftaId: number;
  @IsNumber()
  litrosGastados: number;
}
