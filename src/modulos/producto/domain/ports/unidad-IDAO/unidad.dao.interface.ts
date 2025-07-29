import { UnidadEntity } from '../../entities/unidad-entity/Unidad.entity';

export interface UnidadIDAO {
  findAll(): Promise<UnidadEntity[]>;
  create(nombre: string, simbolo: string): Promise<UnidadEntity>;
  findByNombre(nombre: string): Promise<UnidadEntity | null>;
  findById(id: number): Promise<UnidadEntity | null>;
}
