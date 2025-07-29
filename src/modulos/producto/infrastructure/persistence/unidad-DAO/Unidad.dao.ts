import { PrismaService } from '../../../../../prisma/prisma.service';
import { UnidadIDAO } from '../../../domain/ports/unidad-IDAO/unidad.dao.interface';
import { UnidadEntity } from 'src/modulos/producto/domain/entities/unidad-entity/Unidad.entity';
import { UnidadMapper } from '../../mappers/unidad-mapper/unidad.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnidadDAO implements UnidadIDAO {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UnidadEntity[]> {
    const unidades = await this.prisma.unidad.findMany();
    return unidades.map(UnidadMapper.toEntity);
  }

  async create(nombre: string, simbolo: string): Promise<UnidadEntity> {
    const created = await this.prisma.unidad.create({
      data: { nombre, simbolo },
    });
    return UnidadMapper.toEntity(created);
  }

  async findByNombre(nombre: string): Promise<UnidadEntity | null> {
    const result = await this.prisma.unidad.findUnique({
      where: { nombre },
    });
    return result ? UnidadMapper.toEntity(result) : null;
  }

  async findById(id: number): Promise<UnidadEntity | null> {
    const result = await this.prisma.unidad.findUnique({
      where: { id },
    });
    return result ? UnidadMapper.toEntity(result) : null;
  }
}
