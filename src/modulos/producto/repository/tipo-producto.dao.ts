import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TipoProductoMapper } from '../mappers/mappers-dao/tipo-producto.mapper';
import { TipoProductoEntity } from '../entities/tipo-producto.entity';
import { ITipoProductoDAO } from '../types/tipo-producto.dao.interface';

@Injectable()
export class TipoProductoDAO implements ITipoProductoDAO {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TipoProductoEntity[]> {
    const modelos = await this.prisma.tipoProducto.findMany();
    return modelos.map(TipoProductoMapper.toEntity);
  }

  async create(nombre: string): Promise<TipoProductoEntity> {
    const created = await this.prisma.tipoProducto.create({
      data: { nombre },
    });
    return TipoProductoMapper.toEntity(created);
  }

  async update(id: number, nombre: string): Promise<TipoProductoEntity> {
    const updated = await this.prisma.tipoProducto.update({
      where: { id },
      data: { nombre },
    });
    return TipoProductoMapper.toEntity(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.tipoProducto.delete({ where: { id } });
  }

  async findByNombre(nombre: string): Promise<TipoProductoEntity | null> {
    const tipoProducto = await this.prisma.tipoProducto.findUnique({
      where: { nombre },
    });
    return tipoProducto ? TipoProductoMapper.toEntity(tipoProducto) : null;
  }

  async findById(id: number): Promise<TipoProductoEntity | null> {
    const tipoProducto = await this.prisma.tipoProducto.findUnique({
      where: { id: id },
    });

    return tipoProducto ? TipoProductoMapper.toEntity(tipoProducto) : null;
  }
}
