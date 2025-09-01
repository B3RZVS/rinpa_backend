export class TipoProductoEntity {
  private readonly id: number;
  private nombre: string;

  constructor(id: number, nombre: string) {
    // validaciones opcionales acá
    this.id = id;
    this.setNombre(nombre);
  }
  public getId(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }
  public setNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre.trim();
  }

  nombreFormateado(): string {
    return this.nombre.toUpperCase(); // ejemplo simple
  }
}
