import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class UpdateEntregaDTO {
  @IsNumber()
  @IsOptional()
  clienteId: number;
  @IsNumber()
  @IsOptional()
  usuarioId: number;
  @IsNumber()
  @IsOptional()
  precioNaftaId: number;
  @IsNumber()
  @IsOptional()
  litrosGastados: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fecha: Date;
}
