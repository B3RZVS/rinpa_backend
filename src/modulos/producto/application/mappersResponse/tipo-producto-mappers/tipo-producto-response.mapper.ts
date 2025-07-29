import { TipoProductoEntity } from 'src/modulos/producto/domain/entities/tipo-producto-entity/tipo-producto.entity';
import { GetTipoProductoDto } from '../../dtos/tipo-producto-dto/get-tipoProducto.dto';

export class TipoProductoViewMapper {
  static toResponse(entity: TipoProductoEntity): GetTipoProductoDto {
    return {
      id: entity.getId(),
      nombre: entity.getNombre(),
    };
  }
}
