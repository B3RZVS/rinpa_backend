import { DetalleEntregaEntity } from '../entities/detalleEntrega.entity';
import { DetalleEntregaMapper } from '../mappers/mapper-dao/detalle-entrega.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDetalleEntregaDTO } from '../dtos/detalleEntrega/create-detalle-entrega.dto';
import { DetalleEntregaIDAO } from '../types/detalle.dao.interface';

@Injectable()
export class DetalleEntregaDAO implements DetalleEntregaIDAO {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(entregaId: number): Promise<DetalleEntregaEntity[]> {
    const detalleEntregas = await this.prisma.detalleEntrega.findMany({
      where: { entregaId },
      include: {
        producto: true,
      },
      orderBy: {
        id: 'desc',
      },
      take: 5,
    });
    return detalleEntregas.map((e) => DetalleEntregaMapper.toEntity(e));
  }

  async create(
    data: CreateDetalleEntregaDTO | CreateDetalleEntregaDTO[],
    entregaId: number,
  ) {
    const detalles = Array.isArray(data) ? data : [data];
    await this.prisma.detalleEntrega.createMany({
      data: detalles.map((d) => ({
        cantidad: d.cantidad,
        precioUnitario: d.precioUnitario,
        subTotal: d.cantidad * d.precioUnitario,
        productoId: d.productoId,
        entregaId: entregaId,
      })),
    });
  }

  async update(id: number, cantidad: number): Promise<DetalleEntregaEntity> {
    const updatedDetalleEntrega = await this.prisma.detalleEntrega.update({
      where: { id },
      data: {
        cantidad,
      },
    });
    const detalleEntrega = await this.findById(updatedDetalleEntrega.id);
    if (!detalleEntrega)
      throw new Error('Error al buscar el detelle recién modificada');
    return detalleEntrega;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.detalleEntrega.delete({
      where: { id },
    });
  }

  async findById(id: number): Promise<DetalleEntregaEntity | null> {
    const exits = await this.prisma.detalleEntrega.findUnique({
      where: { id },
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
    });
    return exits ? DetalleEntregaMapper.toEntity(exits) : null;
  }
}
