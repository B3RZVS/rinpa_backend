import { EntregaEntity } from '../entities/entrega.entity';
import { EntregaIDAO } from '../types/entrega.dao.interface';
import { EntregaMapper } from '../mappers/mapper-dao/entrega.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import e from 'express';
import { CreateEntregaDTO } from '../dtos/entrega/create-entrega.dto';

@Injectable()
export class EntregaDAO implements EntregaIDAO {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<EntregaEntity[]> {
    const entregas = await this.prisma.entrega.findMany({
      include: { detalles: true },
    });
    return entregas.map((e) => EntregaMapper.toEntity(e, e.detalles));
  }

  async create(data: CreateEntregaDTO): Promise<EntregaEntity> {
    const createdEntrega = await this.prisma.entrega.create({
      data,
    });
    return EntregaMapper.toEntity(createdEntrega);
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
