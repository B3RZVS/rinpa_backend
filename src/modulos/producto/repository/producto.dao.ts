import { ProductoEntity } from 'src/modulos/producto/entities/producto.entity';
import { ProductoIDAO } from '../types/producto.dao.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductoMapper } from '../mappers/mappers-dao/producto.mapper';
import { Injectable } from '@nestjs/common';
import { UpdateProductoDTO } from '../dtos/producto/update-producto.dto';

@Injectable()
export class ProductoDAO implements ProductoIDAO {
  constructor(private readonly prisma: PrismaService) {}

  //GET
  async findAll(): Promise<ProductoEntity[]> {
    const productos = await this.prisma.producto.findMany({
      where: { isDeleted: false },
      include: {
        tipoProducto: true,
        medida: {
          include: {
            unidad: true,
          },
        },
      },
    });
    try {
      return productos.map(ProductoMapper.toEntity);
    } catch (error) {
      console.error('Error mapeando producto:', error);
      throw error;
    }
  }

  //POST
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
    const producto = await this.findById(createProducto.id);
    if (!producto) throw new Error('Error al buscar el producto recién creada');
    return producto;
  }

  //PUT
  async update(data: UpdateProductoDTO): Promise<ProductoEntity> {
    const updateProducto = await this.prisma.producto.update({
      where: { id: data.id },
      data,
    });
    const producto = await this.findById(updateProducto.id);
    if (!producto) throw new Error('Error al buscar el producto recién creada');
    return producto;
  }

  //DELETE
  async delete(id: number): Promise<void> {
    await this.prisma.producto.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
  //Restore
  async restore(id: number): Promise<ProductoEntity> {
    const restoreProducto = await this.prisma.producto.update({
      where: { id },
      data: { isDeleted: false },
    });
    const producto = await this.findById(restoreProducto.id);
    if (!producto) throw new Error('Error al buscar el producto recién creada');
    return producto;
  }

  //FINDById
  async findById(id: number): Promise<ProductoEntity | null> {
    const producto = await this.prisma.producto.findUnique({
      where: { id },
      include: {
        medida: {
          include: {
            unidad: true,
          },
        },
        tipoProducto: true,
      },
    });

    return producto ? ProductoMapper.toEntity(producto) : null;
  }

  //FindByProducto
  async findByProducto(
    tipoProductoId: number,
    medidaId: number,
  ): Promise<ProductoEntity | null> {
    const producto = await this.prisma.producto.findFirst({
      where: { tipoProductoId, medidaId },
      include: {
        medida: {
          include: {
            unidad: true,
          },
        },
        tipoProducto: true,
      },
    });
    return producto ? ProductoMapper.toEntity(producto) : null;
  }
}
