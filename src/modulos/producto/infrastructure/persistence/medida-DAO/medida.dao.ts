import { MedidaEntity } from 'src/modulos/producto/domain/entities/medida-entity/medidaEntity';
import { MedidaIDAO } from '../../datoTypes/medida-IDAO/medida.dao.interface';
import { MedidaMapper } from '../../mappers/medida-mapper/medida.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MedidaDAO implements MedidaIDAO {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<MedidaEntity[]> {
    const medidas = await this.prisma.medida.findMany({
      include: { unidad: true },
    });
    return medidas.map(MedidaMapper.toEntity);
  }

  async create(cantidad: number, unidad: number): Promise<MedidaEntity> {
    const createdMedida = await this.prisma.medida.create({
      data: {
        cantidad,
        unidadId: unidad,
      },
    });

    const medidaConUnidad = await this.prisma.medida.findUnique({
      where: { id: createdMedida.id },
      include: { unidad: true },
    });

    if (!medidaConUnidad)
      throw new Error('Error al buscar la medida recién creada');
    return MedidaMapper.toEntity(medidaConUnidad);
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
    });
    const medidaConUnidad = await this.prisma.medida.findUnique({
      where: { id: updatedMedida.id },
      include: { unidad: true },
    });

    if (!medidaConUnidad)
      throw new Error('Error al buscar la medida recién modificada');
    return MedidaMapper.toEntity(medidaConUnidad);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.medida.delete({
      where: { id },
    });
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
