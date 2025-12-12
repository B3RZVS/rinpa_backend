import { ProductoEntity } from 'src/modulos/producto/entities/producto.entity';
import { UpdateProductoDTO } from '../dtos/producto/update-producto.dto';

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
  update(data: UpdateProductoDTO): Promise<ProductoEntity>;
  delete(id: number): Promise<void>;
  restore(id: number): Promise<ProductoEntity>;
}
