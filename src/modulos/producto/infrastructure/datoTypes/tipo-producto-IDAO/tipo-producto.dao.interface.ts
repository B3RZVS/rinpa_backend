import { TipoProductoEntity } from 'src/modulos/producto/domain/entities/tipo-producto-entity/tipo-producto.entity';

export interface ITipoProductoDAO {
  findAll(): Promise<TipoProductoEntity[]>;
  findById(id: number): Promise<TipoProductoEntity | null>;
  findByNombre(nombre: string): Promise<TipoProductoEntity | null>;
  create(nombre: string): Promise<TipoProductoEntity>;
  update(id: number, nombre: string): Promise<TipoProductoEntity>;
  delete(id: number): Promise<void>;
}
