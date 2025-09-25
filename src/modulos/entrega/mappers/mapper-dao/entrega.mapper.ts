import { DetalleEntregaEntity } from '../../entities/detalleEntrega.entity';
import { EntregaEntity } from '../../entities/entrega.entity';
import {
  Entrega as PrismaEntrega,
  DetalleEntrega as PrismaDetalleEntrega,
} from '@prisma/client';

export class EntregaMapper {
  static toEntity(
    model: PrismaEntrega,
    detalles?: PrismaDetalleEntrega[],
  ): EntregaEntity {
    const detallesEntity = detalles?.map(
      (d) =>
        new DetalleEntregaEntity(
          d.productoId,
          d.cantidad,
          d.precioUnitario,
          d.subTotal,
          d.id,
        ),
    );
    return new EntregaEntity(
      model.id,
      model.clienteId,
      model.usuarioId,
      model.precioNaftaId,
      model.litrosGastados,
      detallesEntity || [],
    );
  }
}
