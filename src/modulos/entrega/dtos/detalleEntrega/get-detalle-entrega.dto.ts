import { GetProductoDTO } from 'src/modulos/producto/dtos/producto/get-producto.dto';

export interface GetDetalleEntregaDTO {
  id: number;
  producto: GetProductoDTO;
  cantidad: number;
  precioUnitario: number;
  subTotal: number;
}
