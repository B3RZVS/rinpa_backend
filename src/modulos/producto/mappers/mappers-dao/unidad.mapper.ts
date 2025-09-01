import { UnidadEntity } from 'src/modulos/producto/entities/Unidad.entity';
import { Unidad as PrismaUnidad } from '@prisma/client';

export class UnidadMapper {
  static toEntity(model: PrismaUnidad): UnidadEntity {
    return new UnidadEntity(model.id, model.nombre, model.simbolo);
  }
}
