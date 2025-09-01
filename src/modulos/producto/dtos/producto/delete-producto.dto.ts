import { IsNumber, Min } from 'class-validator';

export class DeleteProductoDTO {
  @Min(1)
  @IsNumber()
  id: number;
}
