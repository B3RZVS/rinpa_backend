import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateProductoDTO {
  @Min(1)
  @IsNumber()
  precio: number;

  @MaxLength(150)
  @IsString()
  descripcion: string;
  @Min(1)
  @IsNumber()
  medidaId: number;
  @Min(1)
  @IsNumber()
  tipoProductoId: number;
}
