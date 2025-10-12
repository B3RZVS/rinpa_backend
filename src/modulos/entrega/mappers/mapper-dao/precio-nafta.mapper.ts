import { PrecioNaftaEntity } from '../../entities/precioNafta.entity';
import { PrecioNafta as PrismaPrecioNafta } from '@prisma/client';

export class PrecioNaftaMapper {
  static toEntity(model: PrismaPrecioNafta): PrecioNaftaEntity {
    return new PrecioNaftaEntity(
      model.id,
      model.precio,
      model.fechaInicio,
      model.fechaFin,
    );
  }
}
