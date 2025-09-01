import { TipoProductoEntity } from 'src/modulos/producto/entities/tipo-producto.entity';
import { GetTipoProductoDto } from '../../../dtos/tipo-producto/get-tipoProducto.dto';

export class TipoProductoViewMapper {
  static toResponse(entity: TipoProductoEntity): GetTipoProductoDto {
    return {
      id: entity.getId(),
      nombre: entity.getNombre(),
    };
  }
}
