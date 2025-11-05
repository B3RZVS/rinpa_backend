import { Medida, Producto, TipoProducto } from '@prisma/client';
import { ProductoEntity } from 'src/modulos/producto/entities/producto.entity';
import { TipoProductoMapper } from './tipo-producto.mapper';
import { MedidaMapper } from './medida.mapper';

export class ProductoMapper {
  static toEntity(
    prisma: Producto & { tipoProducto?: TipoProducto } & { medida?: Medida },
  ): ProductoEntity {
    if (!prisma.tipoProducto) {
      throw new Error('Tipo Producto es requerida para crear ProductoEntity');
    }
    if (!prisma.medida) {
      throw new Error('Medida es requerida para crear ProductoEntity');
    }
    const tipoProducto = TipoProductoMapper.toEntity(prisma.tipoProducto);

    const medida = MedidaMapper.toEntity(prisma.medida);

    return new ProductoEntity(
      prisma.id,
      prisma.precio,
      prisma.descripcion,
      tipoProducto,
      medida,
      prisma.isDeleted,
    );
  }
}
