export class RolEntity {
  private id: number;
  private nombre: string;

  constructor(id: number, nombre: string) {
    this.setId(id);
    this.setNombre(nombre);
  }

  setId(id: number) {
    this.id = id;
  }
  setNombre(nombre: string) {
    if (!nombre) throw new Error('El nombre del rol es obligatorio');
    this.nombre = nombre;
  }

  getId(): number {
    return this.id;
  }
  getNombre(): string {
    return this.nombre;
  }
}
