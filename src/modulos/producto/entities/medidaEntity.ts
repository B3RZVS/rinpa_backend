import { UnidadEntity } from './Unidad.entity';
export class MedidaEntity {
  private id: number;
  private cantidad: number;
  private isDeleted: boolean;
  private unidad: UnidadEntity;

  constructor(
    id: number,
    cantidad: number,
    isDeleted: boolean,
    unidad: UnidadEntity,
  ) {
    this.id = id;
    this.setCantidad(cantidad);
    this.setUnidad(unidad);
    this.isDeleted = isDeleted;
  }

  setId(id: number): void {
    this.id = id;
  }
  getId(): number {
    return this.id;
  }
  public isDelete(): boolean {
    return this.isDeleted;
  }

  setCantidad(cantidad: number): void {
    this.cantidad = cantidad;
  }
  getCantidad(): number {
    return this.cantidad;
  }

  setUnidad(unidad: UnidadEntity): void {
    if (!unidad) throw new Error('Unidad no puede ser null');
    this.unidad = unidad;
  }
  getUnidadSimbolo(): string | null {
    return this.unidad?.getSimbolo() || null;
  }
  getUnidadId(): number | null {
    return this.unidad?.getId() || null;
  }
}
