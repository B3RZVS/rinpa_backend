import { UnidadEntity } from 'src/modulos/producto/domain/entities/unidad-entity/Unidad.entity';
import { Unidad as PrismaUnidad } from '@prisma/client';

export class UnidadMapper {
  static toEntity(model: PrismaUnidad): UnidadEntity {
    return new UnidadEntity(model.id, model.nombre, model.simbolo);
  }
}
