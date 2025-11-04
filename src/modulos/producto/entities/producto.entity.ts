import { MedidaEntity } from './medidaEntity';
import { TipoProductoEntity } from './tipo-producto.entity';

export class ProductoEntity {
  private id: number;
  private precio: number;
  private descripcion: string;
  private tipoProducto: TipoProductoEntity;
  private medida: MedidaEntity;
  private isDetele: boolean;

  constructor(
    id: number,
    precio: number,
    descripcion: string,
    tipoProducto: TipoProductoEntity,
    medida: MedidaEntity,
    isDelete: boolean,
  ) {
    this.id = id;
    this.precio = precio;
    this.descripcion = descripcion;
    this.tipoProducto = tipoProducto;
    this.medida = medida;
    this.isDetele = isDelete;
  }

  getId() {
    return this.id;
  }
  getTipoProducto() {
    return this.tipoProducto;
  }
  getTipoProductoId() {
    return this.tipoProducto.getId();
  }
  getMedida() {
    return this.medida;
  }
  getMedidaId() {
    return this.medida.getId();
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
