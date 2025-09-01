import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUnidadDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(1)
  @MaxLength(4)
  simbolo: string;
}
