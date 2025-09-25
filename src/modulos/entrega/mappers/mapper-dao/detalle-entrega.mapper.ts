import { DetalleEntregaEntity } from '../../entities/detalleEntrega.entity';
import { DetalleEntrega as PrismaDetalleEntrega } from '@prisma/client';

export class DetalleEntregaMapper {
  static toEntity(model: PrismaDetalleEntrega): DetalleEntregaEntity {
    return new DetalleEntregaEntity(
      model.id,
      model.productoId,
      model.cantidad,
      model.precioUnitario,
      model.subTotal,
    );
  }
}
