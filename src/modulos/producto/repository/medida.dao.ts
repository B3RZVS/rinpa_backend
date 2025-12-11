import { MedidaEntity } from 'src/modulos/producto/entities/medidaEntity';
import { MedidaIDAO } from '../types/medida.dao.interface';
import { MedidaMapper } from '../mappers/mappers-dao/medida.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MedidaDAO implements MedidaIDAO {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<MedidaEntity[]> {
    const medidas = await this.prisma.medida.findMany({
      where: { isDeleted: false },
      include: { unidad: true },
      orderBy: { id: 'desc' },
    });
    return medidas.map(MedidaMapper.toEntity);
  }

  async create(cantidad: number, unidad: number): Promise<MedidaEntity> {
    const createdMedida = await this.prisma.medida.create({
      data: {
        cantidad,
        unidadId: unidad,
      },
      include: { unidad: true },
    });

    if (!createdMedida)
      throw new Error('Error al buscar la medida recién creada');
    return MedidaMapper.toEntity(createdMedida);
  }

  async update(
    id: number,
    cantidad: number,
    unidad: number,
  ): Promise<MedidaEntity> {
    const updatedMedida = await this.prisma.medida.update({
      where: { id },
      data: {
        cantidad,
        unidadId: unidad,
      },
      include: { unidad: true },
    });

    if (!updatedMedida)
      throw new Error('Error al buscar la medida recién modificada');
    return MedidaMapper.toEntity(updatedMedida);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.medida.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async restore(id: number): Promise<MedidaEntity> {
    const tipo = await this.prisma.medida.update({
      where: { id },
      data: { isDeleted: false },
      include: { unidad: true },
    });
    return MedidaMapper.toEntity(tipo);
  }

  async findById(id: number): Promise<MedidaEntity | null> {
    const exits = await this.prisma.medida.findUnique({
      where: { id },
      include: { unidad: true },
    });
    return exits ? MedidaMapper.toEntity(exits) : null;
  }

  async findByCantidad(
    cantidad: number,
    unidadId: number,
  ): Promise<MedidaEntity | null> {
    const exits = await this.prisma.medida.findFirst({
      where: { cantidad: cantidad, unidadId: unidadId },
      include: { unidad: true },
    });

    return exits ? MedidaMapper.toEntity(exits) : null;
  }
}
