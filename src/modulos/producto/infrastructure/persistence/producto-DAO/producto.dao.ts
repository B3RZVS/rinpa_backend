import { ProductoEntity } from 'src/modulos/producto/domain/entities/producto-entity/producto.entity';
import { ProductoIDAO } from '../../datoTypes/producto-IDAO/producto.dao.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductoMapper } from '../../mappers/producto-mapper/producto.mapper';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ProductoDAO implements ProductoIDAO {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ProductoEntity[]> {
    const productos = await this.prisma.producto.findMany({
      include: { tipoProducto: true, medida: true },
    });
    return productos.map(ProductoMapper.toEntity);
  }

  async create(
    precio: number,
    descripcion: string,
    tipoProductoId: number,
    medidaId: number,
  ): Promise<ProductoEntity> {
    const createProducto = await this.prisma.producto.create({
      data: {
        precio: precio,
        descripcion: descripcion,
        tipoProductoId: tipoProductoId,
        medidaId: medidaId,
      },
    });

    const producto = await this.prisma.producto.findUnique({
      where: { id: createProducto.id },
      include: { medida: true, tipoProducto: true },
    });
    if (!producto) throw new Error('Error al buscar el producto recién creada');
    return ProductoMapper.toEntity(producto);
  }

  async update(
    id: number,
    precio?: number,
    descripcion?: string,
  ): Promise<ProductoEntity> {
    const updateProducto = await this.prisma.producto.update({
      where: { id },
      data: {
        precio,
        descripcion,
      },
    });
    const producto = await this.prisma.producto.findUnique({
      where: { id: updateProducto.id },
      include: { medida: true, tipoProducto: true },
    });
    if (!producto) throw new Error('Error al buscar el producto recién creada');
    return ProductoMapper.toEntity(producto);
  }
  async delete(id: number): Promise<void> {
    await this.prisma.producto.delete({ where: { id } });
  }

  async findById(id: number): Promise<ProductoEntity | null> {
    const producto = await this.prisma.producto.findUnique({
      where: { id },
      include: { medida: true, tipoProducto: true },
    });

    return producto ? ProductoMapper.toEntity(producto) : null;
  }

  async findByProducto(
    tipoProductoId: number,
    medidaId: number,
  ): Promise<ProductoEntity | null> {
    const producto = await this.prisma.producto.findFirst({
      where: { tipoProductoId, medidaId },
      include: { medida: true, tipoProducto: true },
    });
    return producto ? ProductoMapper.toEntity(producto) : null;
  }
}
