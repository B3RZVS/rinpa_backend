import { UnidadEntity } from 'src/modulos/producto/entities/Unidad.entity';
import { GetUnidadDto } from '../../../dtos/unidad/get-unidad.dto';

export class UnidadResponseMapper {
  static toResponse(entity: UnidadEntity): GetUnidadDto {
    return {
      id: entity.getId(),
      nombre: entity.getNombre(),
      simbolo: entity.getSimbolo(),
    };
  }
}
