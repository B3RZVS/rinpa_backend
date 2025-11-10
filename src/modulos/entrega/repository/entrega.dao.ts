import { EntregaEntity } from '../entities/entrega.entity';
import { EntregaIDAO } from '../types/entrega.dao.interface';
import { EntregaMapper } from '../mappers/mapper-dao/entrega.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEntrega } from '../dtos/entrega/create-entrega.dto';
import { DetalleEntregaDAO } from './detalle-entrega.dao';
import { CreateDetalleEntregaDTO } from '../dtos/detalleEntrega/create-detalle-entrega.dto';
import { UpdateEntregaDTO } from '../dtos/entrega/update-entrega.dto';

@Injectable()
export class EntregaDAO implements EntregaIDAO {
  constructor(
    private readonly prisma: PrismaService,
    private readonly detalleDao: DetalleEntregaDAO,
  ) {}

  async findAll(): Promise<EntregaEntity[]> {
    const entregas = await this.prisma.entrega.findMany({
      where: { isDeleted: false },
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
    return entregas.map((e) => EntregaMapper.toEntity(e));
  }

  async findAllPaginated(
    where: any,
    skip: number,
    take: number,
  ): Promise<[EntregaEntity[], number]> {
    const whereClause = { isDeleted: false, ...where };
    const [entregas, total] = await Promise.all([
      this.prisma.entrega.findMany({
        where: whereClause,
        orderBy: { id: 'desc' },
        skip,
        take,
        include: {
          detalles: {
            include: {
              producto: {
                include: {
                  tipoProducto: true,
                  medida: { include: { unidad: true } },
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
      }),
      this.prisma.entrega.count({ where: whereClause }),
    ]);

    return [entregas.map((e) => EntregaMapper.toEntity(e)), total];
  }

  async create(data: CreateEntrega): Promise<EntregaEntity> {
    //Crear entrega
    const createdEntrega = await this.prisma.entrega.create({
      data,
    });
    return EntregaMapper.toEntity(createdEntrega);
  }

  async update(id: number, data: UpdateEntregaDTO): Promise<EntregaEntity> {
    await this.prisma.entrega.update({
      where: { id },
      data,
    });
    const EntregaUpdate = await this.findById(id);
    if (!EntregaUpdate)
      throw new Error('Error al buscar la Entrega recién modificada');
    return EntregaUpdate;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.entrega.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async findById(id: number): Promise<EntregaEntity | null> {
    const exits = await this.prisma.entrega.findUnique({
      where: { id },
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
    return exits ? EntregaMapper.toEntity(exits) : null;
  }
}
