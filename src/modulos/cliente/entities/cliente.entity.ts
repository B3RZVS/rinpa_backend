export class ClienteEntity {
  private id: number;
  private nombre: string;
  private apellido: string;
  private telefono: string;
  private email: string;
  private descripcion: string | null;
  private direccion: string;
  private isDelete: boolean;

  constructor(
    id: number,
    nombre: string,
    apellido: string,
    telefono: string,
    email: string,
    descripcion: string | null,
    direccion: string,
    isDelete: boolean,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
    this.descripcion = descripcion;
    this.direccion = direccion;
    this.isDelete = isDelete;
  }
  // Getters
  getId(): number {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  getApellido(): string {
    return this.apellido;
  }

  getTelefono(): string {
    return this.telefono;
  }

  getEmail(): string {
    return this.email;
  }

  getDescripcion(): string {
    return this.descripcion || '';
  }

  getDireccion(): string {
    return this.direccion;
  }
  getIsDelete(): boolean {
    return this.isDelete;
  }

  // Setters
  setId(id: number): void {
    this.id = id;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  setApellido(apellido: string): void {
    this.apellido = apellido;
  }

  setTelefono(telefono: string): void {
    this.telefono = telefono;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setDescripcion(descripcion: string): void {
    this.descripcion = descripcion;
  }

  setDireccion(direccion: string): void {
    this.direccion = direccion;
  }
}
