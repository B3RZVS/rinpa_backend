import { ProductoMapper } from 'src/modulos/producto/mappers/mappers-dao/producto.mapper';
import { DetalleEntregaEntity } from '../../entities/detalleEntrega.entity';
import {
  DetalleEntrega as PrismaDetalleEntrega,
  Producto as PrismaProducto,
} from '@prisma/client';

export class DetalleEntregaMapper {
  static toEntity(
    model: PrismaDetalleEntrega & { producto?: PrismaProducto },
  ): DetalleEntregaEntity {
    const ProductoEntity = ProductoMapper.toEntity(model.producto!);
    return new DetalleEntregaEntity(
      model.id,
      ProductoEntity,
      model.cantidad,
      model.precioUnitario,
      model.subTotal,
    );
  }
}
