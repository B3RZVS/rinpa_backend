import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EstadisticasService } from '../services/estadisticas.service';
import { GetReporteSemanalDto } from '../dtos/reporte-semanal.dto';
import { GetReporteEntregasDto } from '../dtos/repotte-entregas.dto';
import { GetReporteClientesDto } from '../dtos/reporte-clientes.dto';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Post('reporte-semanal')
  getReporteSemanal(@Body() dto: GetReporteSemanalDto) {
    return this.estadisticasService.getReporteSemanal(dto);
  }

  @Post('reporte-entregas')
  getReporteEntregas(@Body() dto: GetReporteEntregasDto) {
    return this.estadisticasService.getReporteEntregas(dto);
  }

  @Post('reporte-clientes')
  getReporteClientes(@Body() dto: GetReporteClientesDto) {
    return this.estadisticasService.getReporteClientes(dto);
  }

  @Get('estadistica-home')
  getEstadisticasHome() {
    return this.estadisticasService.getEstadisticasHome();
  }
}
