import { IsDate, IsNumber, ValidateNested } from 'class-validator';
import { CreateDetalleEntregaDTO } from '../detalleEntrega/create-detalle-entrega.dto';
import { Type } from 'class-transformer';

export class CreateEntregaDTO {
  @IsNumber()
  clienteId: number;
  @IsNumber()
  usuarioId: number;
  @IsNumber()
  precioNaftaId: number;
  @IsNumber()
  litrosGastados: number;

  @IsDate()
  @Type(() => Date)
  fecha: Date;

  @ValidateNested({ each: true })
  @Type(() => CreateDetalleEntregaDTO)
  detalles: CreateDetalleEntregaDTO[];
}
export class CreateEntrega {
  @IsNumber()
  clienteId: number;
  @IsNumber()
  usuarioId: number;
  @IsNumber()
  precioNaftaId: number;
  @IsNumber()
  litrosGastados: number;

  @IsDate()
  @Type(() => Date)
  fecha: Date;
}
