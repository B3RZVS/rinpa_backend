import { ProductoEntity } from 'src/modulos/producto/entities/producto.entity';

export interface ProductoIDAO {
  findAll(): Promise<ProductoEntity[]>;
  findById(id: number): Promise<ProductoEntity | null>;
  findByProducto(
    tipoProductoId: number,
    medidaId: number,
  ): Promise<ProductoEntity | null>;
  create(
    precio: number,
    descripcion: string,
    medidaId: number,
    tipoProducto: number,
  ): Promise<ProductoEntity>;
  update(
    id: number,
    precio?: number,
    descripcion?: string,
  ): Promise<ProductoEntity>;
  delete(id: number): Promise<void>;
}
