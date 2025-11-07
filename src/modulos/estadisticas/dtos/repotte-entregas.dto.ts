import { GetEntregaDTO } from 'src/modulos/entrega/dtos/entrega/get-entrega.dto';
import { IsDateString } from 'class-validator';

export class GetReporteEntregasDto {
  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;
}

export interface ReporteEntregas {
  periodo: string;
  entregas: GetEntregaDTO[];
  totalGeneral: {
    litrosEntregados: number;
    subtotal: number;
    litrosNafta: number;
    costoNafta: number;
    total: number;
  };
}
