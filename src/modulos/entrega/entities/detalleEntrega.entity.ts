export class DetalleEntregaEntity {
  constructor(
    private id: number,
    private productoId: number,
    private cantidad: number,
    private precioUnitario: number,
    private subTotal: number,
  ) {}

  getId() {
    return this.id;
  }
  getProductoId() {
    return this.productoId;
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
