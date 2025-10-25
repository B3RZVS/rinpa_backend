import { ProductoEntity } from 'src/modulos/producto/entities/producto.entity';
import { GetProductoDTO } from '../../../dtos/producto/get-producto.dto';

export class ProductoResponseMapper {
  static toResponse(producto: ProductoEntity): GetProductoDTO {
    return {
      id: producto.getId(),
      precio: producto.getPrecio(),
      descripcion: producto.getDescripcion(),
      tipoProducto: producto.getTipoProductoNombre(),
      tipoProductoId: producto.getTipoProductoId(),
      medida: producto.getMedidaNombreSimbolo(),
      medidaId: producto.getMedidaId(),
    };
  }
}
