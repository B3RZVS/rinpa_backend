import { IsNumber, IsOptional, MaxLength, Min } from 'class-validator';

export class UpdateProductoDTO {
  @Min(1)
  @IsNumber()
  id: number;
  @Min(1)
  @IsNumber()
  @IsOptional()
  precio?: number;

  @MaxLength(150)
  @IsOptional()
  descripcion?: string;
}
