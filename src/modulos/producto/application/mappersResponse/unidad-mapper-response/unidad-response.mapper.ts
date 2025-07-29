import { UnidadEntity } from 'src/modulos/producto/domain/entities/unidad-entity/Unidad.entity';
import { GetUnidadDto } from '../../dtos/unidad-dto/get-unidad.dto';

export class UnidadResponseMapper {
  static toResponse(entity: UnidadEntity): GetUnidadDto {
    return {
      id: entity.getId(),
      nombre: entity.getNombre(),
      simbolo: entity.getSimbolo(),
    };
  }
}
