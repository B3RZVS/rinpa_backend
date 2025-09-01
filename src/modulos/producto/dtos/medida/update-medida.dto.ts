import { IsNumber, Min } from 'class-validator';

export class UpdateMedidaDTO {
  @Min(1)
  @IsNumber()
  id: number;
  @Min(1)
  @IsNumber()
  cantidad: number;
  @Min(1)
  @IsNumber()
  unidadId: number;
}
