import { DetalleEntregaEntity } from '../../entities/detalleEntrega.entity';
import { GetDetalleEntregaDTO } from '../../dtos/detalleEntrega/get-detalle-entrega.dto';
import { ProductoResponseMapper } from 'src/modulos/producto/mappers/mappersResponse/producto/producto-response.mapper';

export class DetalleEntregaResponseMapper {
  static toResponse(detalle: DetalleEntregaEntity): GetDetalleEntregaDTO {
    const producto = ProductoResponseMapper.toResponse(detalle.getProducto());

    return {
      id: detalle.getId(),
      producto: producto,
      cantidad: detalle.getCantidad(),
      precioUnitario: detalle.getPrecioUnitario(),
      subTotal: detalle.getSubTotal(),
    };
  }
}
