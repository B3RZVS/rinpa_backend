import { MedidaEntity } from 'src/modulos/producto/domain/entities/medida-entity/medidaEntity';
import { Medida as PrismaMedida } from '@prisma/client';
import { UnidadMapper } from '../unidad-mapper/unidad.mapper';
import { Unidad as PrismaUnidad } from '@prisma/client';

export class MedidaMapper {
  static toEntity(
    model: PrismaMedida & { unidad?: PrismaUnidad },
  ): MedidaEntity {
    if (!model.unidad) {
      throw new Error('Unidad es requerida para crear MedidaEntity');
    }

    const unidadEntity = UnidadMapper.toEntity(model.unidad);

    return new MedidaEntity(model.id, model.cantidad, unidadEntity);
  }
}
