import { RolEntity } from '../../domain/entities/rol-entity/rol.entity';

export interface RolIDAO {
  findAll(): Promise<RolEntity[]>;
  findById(id: number): Promise<RolEntity | null>;
  create(nombre: string): Promise<RolEntity>;
  // update(id: number, cantidad: number, unidad: number): Promise<MedidaEntity>;
  delete(id: number): Promise<void>;
}
