import { EntregaEntity } from '../entities/entrega.entity';
import { EntregaIDAO } from '../types/entrega.dao.interface';
import { EntregaMapper } from '../mappers/mapper-dao/entrega.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEntrega } from '../dtos/entrega/create-entrega.dto';
import { DetalleEntregaDAO } from './detalle-entrega.dao';
import { CreateDetalleEntregaDTO } from '../dtos/detalleEntrega/create-detalle-entrega.dto';

@Injectable()
export class EntregaDAO implements EntregaIDAO {
  constructor(
    private readonly prisma: PrismaService,
    private readonly detalleDao: DetalleEntregaDAO,
  ) {}

  async findAll(): Promise<EntregaEntity[]> {
    const entregas = await this.prisma.entrega.findMany({
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
      },
    });
    return entregas.map((e) => EntregaMapper.toEntity(e));
  }

  async create(
    data: CreateEntrega,
    detalles: CreateDetalleEntregaDTO[],
  ): Promise<EntregaEntity> {
    //Creo entrega
    const createdEntrega = await this.prisma.entrega.create({
      data,
    });

    //Creo detalles
    await this.detalleDao.create(detalles, createdEntrega.id);

    //recupero la entregas con los detalles
    const entregaConDetalle = await this.prisma.entrega.findUnique({
      where: { id: createdEntrega.id },
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
      },
    });

    if (!entregaConDetalle)
      throw new Error('Error al buscar la entrega recién creada');
    return EntregaMapper.toEntity(entregaConDetalle);
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
