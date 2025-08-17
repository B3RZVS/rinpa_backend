import { RolEntity } from '../rol-entity/rol.entity';

export class UserEntity {
  private id: number;
  private nombre: string;
  private apellido: string;
  private email: string;
  private password: string;
  private rol: RolEntity;

  constructor(
    id: number,
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    rol: RolEntity,
  ) {
    this.id = id;
    this.setNombre(nombre);
    this.setApellido(apellido);
    this.setEmail(email);
    this.setPassword(password);
    this.setRol(rol);
  }

  setNombre(nombre: string) {
    if (!nombre) throw new Error('El nombre es obligatorio');
    this.nombre = nombre;
  }

  setApellido(apellido: string) {
    if (!apellido) throw new Error('El apellido es obligatorio');
    this.apellido = apellido;
  }

  setEmail(email: string) {
    if (!email) throw new Error('El email es obligatorio');
    this.email = email;
  }

  setPassword(password: string) {
    if (!password) throw new Error('El password es obligatorio');
    this.password = password; // acá más adelante se puede hashear
  }

  setRol(rol: RolEntity) {
    if (!rol) throw new Error('El rol es obligatorio');
    this.rol = rol;
  }

  getId(): number {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  getApellido(): string {
    return this.apellido;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getRol(): RolEntity {
    return this.rol;
  }
}
