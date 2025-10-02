import { ProductoMapper } from 'src/modulos/producto/mappers/mappers-dao/producto.mapper';
import { DetalleEntregaEntity } from '../../entities/detalleEntrega.entity';
import { EntregaEntity } from '../../entities/entrega.entity';

import { Prisma } from '@prisma/client';

type PrismaEntregaWithDetalles = Prisma.EntregaGetPayload<{
  include: { detalles: { include: { producto: true } } };
}>;

export class EntregaMapper {
  static toEntity(model: PrismaEntregaWithDetalles): EntregaEntity {
    const detallesEntity = model.detalles?.map((d) => {
      const producto = ProductoMapper.toEntity(d.producto);
      return new DetalleEntregaEntity(
        d.id,
        producto,
        d.cantidad,
        d.precioUnitario,
        d.subTotal,
      );
    });
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
