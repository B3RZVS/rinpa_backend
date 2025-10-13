import { IsNumber, Min } from 'class-validator';

export class CreateMedidaDTO {
  @Min(1)
  @IsNumber()
  cantidad: number;
  @Min(1)
  @IsNumber()
  unidadId: number;
}
