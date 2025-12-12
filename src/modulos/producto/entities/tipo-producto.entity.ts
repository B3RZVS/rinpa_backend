export class TipoProductoEntity {
  private readonly id: number;
  private nombre: string;
  private isDeleted: boolean;

  constructor(id: number, nombre: string, isDeleted: boolean) {
    // validaciones opcionales acá
    this.id = id;
    this.setNombre(nombre);
    this.isDeleted = isDeleted;
  }
  public getId(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }
  public isDelete(): boolean {
    return this.isDeleted;
  }
  public setNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre.trim();
  }

  nombreFormateado(): string {
    return this.nombre.toUpperCase(); // ejemplo simple
  }
}
