import { UnidadEntity } from './Unidad.entity';
export class MedidaEntity {
  private id: number;
  private cantidad: number;
  private unidad: UnidadEntity;

  constructor(id: number, cantidad: number, unidad: UnidadEntity) {
    this.id = id;
    this.setCantidad(cantidad);
    this.setUnidad(unidad);
  }

  setId(id: number): void {
    this.id = id;
  }
  getId(): number {
    return this.id;
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
