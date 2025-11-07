import { IsOptional, IsDateString } from 'class-validator';

export class GetReporteClientesDto {
  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;
}

export interface ClienteReporte {
  nombre: string;
  entregasRealizadas: number;
  productoMasPedido: string;
  litrosTotales: number;
  totalFacturado: number;
}

export interface ReporteClientes {
  periodo: string;
  clientes: ClienteReporte[];
}
