import { Injectable } from '@nestjs/common';
import { GetReporteSemanalDto } from '../dtos/reporte-semanal.dto';
import { GetReporteEntregasDto } from '../dtos/repotte-entregas.dto';
import { GetReporteClientesDto } from '../dtos/reporte-clientes.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { getRangeUTC } from '../utils/getDateRangeUTC';
import { EstadisticasRepository } from '../repository/estadisticas.dao';
import { EstadisticasMapper } from '../mappers/estadisticas.mapper';
import { EstadisticasValidator } from '../validators/estadisticas.validator';

@Injectable()
export class EstadisticasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly estadisticasRepository: EstadisticasRepository,
    private readonly estadisticaValidator: EstadisticasValidator,
  ) {}

  async getReporteSemanal(dto: GetReporteSemanalDto) {
    const { fechaInicio, fechaFin } = dto;
    const { inicio, fin } = getRangeUTC(fechaInicio, fechaFin);
    await this.estadisticaValidator.dateValidator(inicio, fin);

    const entregas = await this.estadisticasRepository.findEntregasByRange(
      inicio,
      fin,
    );
    const clientesConEntrega =
      await this.estadisticasRepository.findClientesConEntrega(inicio, fin);

    return EstadisticasMapper.toReporteSemanal({
      entregas,
      clientesConEntrega,
      fechaInicio,
      fechaFin,
    });
  }

  async getReporteEntregas(dto: GetReporteEntregasDto) {
    const { fechaInicio, fechaFin } = dto;
    const { inicio, fin } = getRangeUTC(fechaInicio, fechaFin);
    await this.estadisticaValidator.dateValidator(inicio, fin);

    const entregas = await this.estadisticasRepository.findEntregasByRange(
      inicio,
      fin,
    );

    return EstadisticasMapper.toReporteEntrega(entregas, fechaInicio, fechaFin);
  }

  async getReporteClientes(dto: GetReporteClientesDto) {
    const { fechaInicio, fechaFin } = dto;
    const { inicio, fin } = getRangeUTC(fechaInicio, fechaFin);
    await this.estadisticaValidator.dateValidator(inicio, fin);

    const entregas = await this.estadisticasRepository.findEntregasByRange(
      inicio,
      fin,
    );

    return EstadisticasMapper.toReporteCliente(entregas, fechaInicio, fechaFin);
  }

  async getEstadisticasHome() {
    const cantClientes = await this.estadisticasRepository.findAllClientes();
    const cantProducto = await this.estadisticasRepository.findAllProductos();
    const cantEntregas = await this.estadisticasRepository.findEntregasToday();

    return {
      cantClientes,
      cantProducto,
      cantEntregas,
    };
  }
}
