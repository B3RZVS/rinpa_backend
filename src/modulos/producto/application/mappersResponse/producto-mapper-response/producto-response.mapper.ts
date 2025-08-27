import { ProductoEntity } from 'src/modulos/producto/domain/entities/producto-entity/producto.entity';
import { GetProductoDTO } from '../../dtos/producto-dto/get-producto.dto';
import { privateDecrypt } from 'crypto';

export class ProductoResponseMapper {
  static toResponse(producto: ProductoEntity): GetProductoDTO {
    return {
      id: producto.getId(),
      precio: producto.getPrecio(),
      decripcion: producto.getDescripcion(),
      tipoProducto: producto.getTipoProductoNombre(),
      medida: producto.getMedidaNombreSimbolo(),
    };
  }
}
