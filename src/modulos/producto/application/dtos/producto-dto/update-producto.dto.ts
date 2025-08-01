import { IsNumber, MaxLength, Min } from 'class-validator';

export class UpdateProductoDTO {
  @Min(1)
  @IsNumber()
  id: number;
  @Min(1)
  @IsNumber()
  precio: number;

  @MaxLength(150)
  descripcion: string;
}
