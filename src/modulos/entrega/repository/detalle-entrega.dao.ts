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
    });
    return detalleEntregas.map((e) => DetalleEntregaMapper.toEntity(e));
  }

  async create(data: CreateDetalleEntregaDTO[], entregaId: number) {
    await this.prisma.detalleEntrega.createMany({
      data: data.map((d) => ({
        cantidad: d.cantidad,
        precioUnitario: d.precioUnitario,
        subTotal: d.cantidad * d.precioUnitario,
        productoId: d.productoId,
        entregaId: entregaId,
      })),
    });
  }

  //   async update(
  //     id: number,
  //     cantidad: number,
  //     unidad: number,
  //   ): Promise<EntregaEntity> {
  //     const updatedEntrega = await this.prisma.entrega.update({
  //       where: { id },
  //       data: {
  //         cantidad,
  //         unidadId: unidad,
  //       },
  //     });
  //     const EntregaConUnidad = await this.prisma.entrega.findUnique({
  //       where: { id: updatedEntrega.id },
  //       include: { unidad: true },
  //     });

  //     if (!EntregaConUnidad)
  //       throw new Error('Error al buscar la Entrega recién modificada');
  //     return EntregaMapper.toEntity(EntregaConUnidad);
  //   }

  //   async delete(id: number): Promise<void> {
  //     await this.prisma.entrega.delete({
  //       where: { id },
  //     });
  //   }

  //   async findById(id: number): Promise<EntregaEntity | null> {
  //     const exits = await this.prisma.Entrega.findUnique({
  //       where: { id },
  //       include: { unidad: true },
  //     });
  //     return exits ? EntregaMapper.toEntity(exits) : null;
  //   }

  //   async findByCantidad(
  //     cantidad: number,
  //     unidadId: number,
  //   ): Promise<EntregaEntity | null> {
  //     const exits = await this.prisma.Entrega.findFirst({
  //       where: { cantidad: cantidad, unidadId: unidadId },
  //       include: { unidad: true },
  //     });

  //     return exits ? EntregaMapper.toEntity(exits) : null;
  //   }
}
