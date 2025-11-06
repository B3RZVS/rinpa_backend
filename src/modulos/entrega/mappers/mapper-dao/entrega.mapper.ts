import { ProductoMapper } from 'src/modulos/producto/mappers/mappers-dao/producto.mapper';
import { DetalleEntregaEntity } from '../../entities/detalleEntrega.entity';
import { EntregaEntity } from '../../entities/entrega.entity';
import { ClienteMappers } from 'src/modulos/cliente/mappers/cliente.mapper';
import { UserMapper } from 'src/modulos/user/infrastructure/mappers/user-mapper/user.mapper';
import { PrecioNaftaMapper } from './precio-nafta.mapper';

import { Prisma } from '@prisma/client';

type PrismaEntregaBase = Prisma.EntregaGetPayload<{}>;

type PrismaEntregaWithDetalles = Prisma.EntregaGetPayload<{
  include: { detalles: { include: { producto: true } } };
}>;

type PrismaEntregaWithRelations = Prisma.EntregaGetPayload<{
  include: {
    detalles: { include: { producto: true } };
    cliente?: true;
    usuario?: { include: { rol: true } };
    precioNafta?: true;
  };
}>;

type PrismaEntregaModel = PrismaEntregaBase | PrismaEntregaWithDetalles | PrismaEntregaWithRelations;

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

    // Mapear relaciones si están presentes
    const clienteEntity = (model as any).cliente
      ? ClienteMappers.toEntity((model as any).cliente)
      : null;

    const usuarioEntity = (model as any).usuario
      ? UserMapper.toEntity((model as any).usuario)
      : null;

    const precioNaftaEntity = (model as any).precioNafta
      ? PrecioNaftaMapper.toEntity((model as any).precioNafta)
      : null;

    return new EntregaEntity(
      model.id,
      model.fecha,
      model.clienteId,
      model.usuarioId,
      model.precioNaftaId,
      model.litrosGastados,
      model.isDeleted,
      detallesEntity || [],
      clienteEntity,
      usuarioEntity,
      precioNaftaEntity,
    );
  }
}
