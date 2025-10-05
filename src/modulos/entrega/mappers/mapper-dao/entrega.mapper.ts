import { ProductoMapper } from 'src/modulos/producto/mappers/mappers-dao/producto.mapper';
import { DetalleEntregaEntity } from '../../entities/detalleEntrega.entity';
import { EntregaEntity } from '../../entities/entrega.entity';

import { Prisma } from '@prisma/client';

type PrismaEntregaBase = Prisma.EntregaGetPayload<{}>;

type PrismaEntregaWithDetalles = Prisma.EntregaGetPayload<{
  include: { detalles: { include: { producto: true } } };
}>;
type PrismaEntregaModel = PrismaEntregaBase | PrismaEntregaWithDetalles;

export class EntregaMapper {
  static toEntity(model: PrismaEntregaModel): EntregaEntity {
    const detallesEntity =
      Array.isArray((model as any).detalles) &&
      (model as any).detalles.length > 0
        ? (model as any).detalles.map((d: any) => {
            const producto = ProductoMapper.toEntity(d.producto);
            return new DetalleEntregaEntity(
              d.id,
              producto,
              d.cantidad,
              d.precioUnitario,
              d.subTotal,
            );
          })
        : [];

    return new EntregaEntity(
      model.id,
      model.fecha,
      model.clienteId,
      model.usuarioId,
      model.precioNaftaId,
      model.litrosGastados,
      model.isDeleted,
      detallesEntity || [],
    );
  }
}
