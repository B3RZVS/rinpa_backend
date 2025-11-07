import { Injectable } from '@nestjs/common';
import { GetReporteSemanalDto } from '../dtos/reporte-semanal.dto';
import { GetReporteEntregasDto } from '../dtos/repotte-entregas.dto';
import { GetReporteClientesDto } from '../dtos/reporte-clientes.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EstadisticasService {
  constructor(private readonly prisma: PrismaService) {}

  async getReporteSemanal(dto: GetReporteSemanalDto) {
    const { fechaInicio, fechaFin } = dto;

    const entregas = await this.prisma.entrega.findMany({
      where: {
        fecha: {
          gte: new Date(fechaInicio),
          lte: new Date(fechaFin),
        },
        isDeleted: false,
      },
      orderBy: { fecha: 'desc' },
      include: {
        detalles: {
          include: {
            producto: {
              include: {
                tipoProducto: true,
                medida: {
                  include: {
                    unidad: true,
                  },
                },
              },
            },
          },
        },
        cliente: true,
        usuario: {
          include: {
            rol: true,
          },
        },
        precioNafta: true,
      },
    });
    const totalEntregas = entregas.length;

    const productosEntregados = [
      ...new Set(
        entregas.flatMap((e) =>
          e.detalles.map((d) => {
            (d.producto.tipoProducto, d.producto.medida);
          }),
        ),
      ),
    ];

    const clientesConEntrega = await this.prisma.entrega.findMany({
      where: {
        fecha: {
          gte: new Date(fechaInicio),
          lte: new Date(fechaFin),
        },
      },
      distinct: ['clienteId'], // ← clientes únicos
      select: {
        clienteId: true,
      },
    });

    // consumo total de nafta
    const consumoTotalNafta = entregas.reduce(
      (sum, e) => sum + (e.litrosGastados ?? 0),
      0,
    );

    return {
      concepto: 'Reporte Semanal de Actividad',
      detalle: 'Resumen general del período',
      fechaEmision: new Date(),
      periodo: `${fechaInicio} al ${fechaFin}`,
      totalEntregas,
      productosEntregados,
      clientesConEntrega,
      consumoTotalNafta,
    };
  }

  async getReporteEntregas(dto: GetReporteEntregasDto) {
    const { fechaInicio, fechaFin } = dto;
    const entregas = await this.prisma.entrega.findMany({
      where: {
        fecha: { gte: new Date(fechaInicio), lte: new Date(fechaFin) },
      },
      include: {
        detalles: {
          include: {
            producto: {
              include: {
                tipoProducto: true,
                medida: {
                  include: { unidad: true },
                },
              },
            },
          },
        },
        cliente: true,
        usuario: true,
        precioNafta: true,
      },
      orderBy: { fecha: 'asc' },
    });

    const data = entregas.map((e, index) => {
      // precioNafta.valor es el precio actual al momento de la entrega
      const costoNaftaPorLitro = e.precioNafta?.precio ?? 0;

      const subtotal = e.detalles.reduce(
        (sum, d) => sum + d.cantidad * (d.producto.precio ?? 0),
        0,
      );

      const costoNafta = (e.litrosGastados ?? 0) * costoNaftaPorLitro;
      const total = subtotal + costoNafta;

      const productos = e.detalles
        .map(
          (d) =>
            `${d.producto.tipoProducto}${d.producto.medida} (${d.cantidad} @ $${d.producto.precio})`,
        )
        .join(', ');

      return {
        numeroEntrega: (index + 1).toString().padStart(3, '0'),
        fecha: e.fecha,
        cliente: e.cliente.nombre,
        productos,
        cantidadProductosEntregados: e.detalles.reduce(
          (sum, d) => sum + d.cantidad,
          0,
        ),
        costoUnitarioPromedio:
          subtotal / (e.detalles.reduce((sum, d) => sum + d.cantidad, 0) || 1),
        subtotal,
        naftaConsumida: e.litrosGastados ?? 0,
        costoNafta,
        total,
      };
    });
    const totalGeneral = {
      cantidadProductosEntregados: data.reduce(
        (sum, e) => sum + e.cantidadProductosEntregados,
        0,
      ),
      subtotal: data.reduce((sum, e) => sum + e.subtotal, 0),
      litrosNafta: data.reduce((sum, e) => sum + e.naftaConsumida, 0),
      costoNafta: data.reduce((sum, e) => sum + e.costoNafta, 0),
      total: data.reduce((sum, e) => sum + e.total, 0),
    };

    return {
      periodo: `${fechaInicio} al ${fechaFin}`,
      entregas: data,
      totalGeneral,
    };
  }

  async getReporteClientes(dto: GetReporteClientesDto) {
    const { fechaInicio, fechaFin } = dto;
    const entregas = await this.prisma.entrega.findMany({
      where: {
        ...(fechaInicio && fechaFin
          ? {
              fecha: {
                gte: new Date(fechaInicio),
                lte: new Date(fechaFin),
              },
            }
          : {}),
      },
      include: {
        detalles: {
          include: {
            producto: {
              include: {
                tipoProducto: true,
                medida: {
                  include: { unidad: true },
                },
              },
            },
          },
        },
        cliente: true,
      },
    });
    const clientesMap = new Map();
    for (const e of entregas) {
      const id = e.cliente.id;
      if (!clientesMap.has(id)) {
        clientesMap.set(id, {
          nombre: e.cliente.nombre,
          entregasRealizadas: 0,
          cantidadProductosTotales: 0,
          totalFacturado: 0,
          productos: {},
        });
      }

      const cliente = clientesMap.get(id);
      cliente.entregasRealizadas += 1;

      for (const d of e.detalles) {
        cliente.cantidadProductosTotales += d.cantidad;
        const subtotal = d.cantidad * (d.producto.precio ?? 0);
        cliente.totalFacturado += subtotal;

        cliente.productos[d.producto.tipoProducto.nombre] =
          (cliente.productos[d.producto.tipoProducto.nombre] ?? 0) + d.cantidad;
      }
    }

    const clientes = Array.from(clientesMap.values()).map((c) => {
      const productoMasPedido = Object.entries(c.productos).sort(
        (a, b) => b[1] - a[1],
      )[0][0];

      return {
        nombre: c.nombre,
        entregasRealizadas: c.entregasRealizadas,
        productoMasPedido,
        litrosTotales: c.litrosTotales,
        totalFacturado: c.totalFacturado,
      };
    });

    return {
      periodo:
        fechaInicio && fechaFin
          ? `${fechaInicio} al ${fechaFin}`
          : 'Histórico completo',
      clientes,
    };
  }
}
