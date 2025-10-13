export class PrecioNaftaEntity {
  constructor(
    private id: number,
    private precio: number,
    private fechaInicio: Date,
    private fechaFin: Date | null,
  ) {}

  getId(): number {
    return this.id;
  }

  getPrecio(): number {
    return this.precio;
  }

  setPrecio(precio: number): void {
    this.precio = precio;
  }

  getFechaInicio(): Date {
    return this.fechaInicio;
  }

  getFechaFin(): Date | null {
    return this.fechaFin;
  }

  setFechaFin(fecha: Date): void {
    this.fechaFin = fecha;
  }
}
