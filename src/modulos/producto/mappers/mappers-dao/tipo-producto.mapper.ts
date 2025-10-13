import { TipoProductoEntity } from '../../entities/tipo-producto.entity';
import { TipoProducto as PrismaTipoProducto } from '@prisma/client';

export class TipoProductoMapper {
  static toEntity(model: PrismaTipoProducto): TipoProductoEntity {
    return new TipoProductoEntity(model.id, model.nombre);
  }

  static toPrisma(entity: TipoProductoEntity): PrismaTipoProducto {
    return {
      id: entity.getId(),
      nombre: entity.getNombre(),
    };
  }
}
