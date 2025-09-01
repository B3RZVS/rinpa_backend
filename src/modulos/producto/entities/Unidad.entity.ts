export class UnidadEntity {
  private id: number;
  private nombre: string;
  private simbolo: string;

  constructor(id: number, nombre: string, simbolo: string) {
    this.id = id;
    this.setNombre(nombre);
    this.setSimbolo(simbolo);
  }

  setId(id: number): void {
    this.id = id;
  }
  setNombre(nombre: string): void {
    this.nombre = nombre.trim();
  }
  setSimbolo(simbolo: string): void {
    this.simbolo = simbolo.trim();
  }

  getId(): number {
    return this.id;
  }
  getNombre(): string {
    return this.nombre;
  }
  getSimbolo(): string {
    return this.simbolo;
  }
}
