import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EstadisticasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findEntregasByRange(inicio: Date, fin: Date) {
    return this.prisma.entrega.findMany({
      where: {
        fecha: { gte: inicio, lte: fin },
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
                  include: { unidad: true },
                },
              },
            },
          },
        },
        cliente: true,
        usuario: { include: { rol: true } },
        precioNafta: true,
      },
    });
  }

  async findClientesConEntrega(inicio: Date, fin: Date) {
    return this.prisma.entrega.findMany({
      where: {
        fecha: { gte: inicio, lte: fin },
      },
      distinct: ['clienteId'],
      select: {
        cliente: {
          select: { nombre: true, apellido: true },
        },
      },
    });
  }

  async findAllClientes() {
    return this.prisma.cliente.count({
      where: { isDeleted: false },
    });
  }
  async findAllProductos() {
    return this.prisma.producto.count({
      where: { isDeleted: false },
    });
  }
  async findEntregasToday() {
    const now = new Date();

    // Día actual en ART
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    // INICIO -> 23:00 del día anterior ART
    const inicio = new Date(year, month, day - 2, 23, 0, 0, 0);
    // FIN -> 22:59:59 del día actual ART
    const fin = new Date();
    return this.prisma.entrega.count({
      where: {
        fecha: {
          gte: inicio,
          lte: fin,
        },
        isDeleted: false,
      },
    });
  }
}
