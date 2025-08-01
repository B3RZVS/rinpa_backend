import { MedidaEntity } from '../medida-entity/medidaEntity';
import { TipoProductoEntity } from '../tipo-producto-entity/tipo-producto.entity';

export class ProductoEntity {
  private id: number;
  private precio: number;
  private descripcion: string;
  private tipoProducto: TipoProductoEntity;
  private medida: MedidaEntity;

  constructor(
    id: number,
    precio: number,
    descripcion: string,
    tipoProducto: TipoProductoEntity,
    medida: MedidaEntity,
  ) {
    this.id = id;
    this.precio = precio;
    this.descripcion = descripcion;
    this.tipoProducto = tipoProducto;
    this.medida = medida;
  }

  getId() {
    return this.id;
  }
  getTipoProducto() {
    return this.tipoProducto;
  }
  getMedida() {
    return this.medida;
  }
  getPrecio() {
    return this.precio;
  }
  getDescripcion() {
    return this.descripcion;
  }

  // Métodos útiles para obtener datos encapsulados
  getTipoProductoNombre() {
    return this.tipoProducto.getNombre();
  }

  getMedidaSimbolo() {
    return this.medida.getUnidadSimbolo();
  }
  getMedidaNombreSimbolo() {
    return `${this.medida.getCantidad()} ${this.medida.getUnidadSimbolo()}`;
  }
}
