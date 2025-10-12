import { ProductoEntity } from 'src/modulos/producto/entities/producto.entity';
import { GetProductoDTO } from '../../../dtos/producto/get-producto.dto';

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
