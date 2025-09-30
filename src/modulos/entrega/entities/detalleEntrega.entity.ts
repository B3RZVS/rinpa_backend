import { ProductoEntity } from 'src/modulos/producto/entities/producto.entity';

export class DetalleEntregaEntity {
  constructor(
    private id: number,
    private producto: ProductoEntity,
    private cantidad: number,
    private precioUnitario: number,
    private subTotal: number,
  ) {}

  getId() {
    return this.id;
  }
  getProductoId() {
    return this.producto.getId();
  }
  getProducto() {
    return this.producto;
  }

  getCantidad() {
    return this.cantidad;
  }

  getPrecioUnitario() {
    return this.precioUnitario;
  }

  getSubTotal() {
    return this.subTotal;
  }
}
