import { IsDateString } from 'class-validator';

export class GetReporteSemanalDto {
  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;
}

export interface ReporteSemanalResponse {
  concepto: string;
  detalle: string;
  fechaEmision: Date;
  periodo: string;
  totalEntregas: number;
  productosEntregados: string[];
  clientesEntregados: number;
  consumoTotalNafta: number;
}
