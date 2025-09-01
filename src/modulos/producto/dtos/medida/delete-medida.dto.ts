import { IsNumber, Min } from 'class-validator';

export class DeleteMedidaDTO {
  @Min(1)
  @IsNumber()
  id: number;
}
