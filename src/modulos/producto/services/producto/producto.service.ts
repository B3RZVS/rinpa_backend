import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ProductoEntity } from 'src/modulos/producto/entities/producto.entity';
import { ProductoValidator } from 'src/modulos/producto/validators/producto.validator';
import { ProductoDAO } from 'src/modulos/producto/repository/producto.dao';
import { UpdateProductoDTO } from '../../dtos/producto/update-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @Inject('ProductoIDAO') private readonly productoDAO: ProductoDAO,
    private readonly productoValidator: ProductoValidator,
  ) {}

  async getAll(): Promise<ProductoEntity[]> {
    return await this.productoDAO.findAll();
  }

  async create(
    precio: number,
    descripcion: string,
    tipoProductoId: number,
    medidaId: number,
  ): Promise<ProductoEntity> {
    const validation = await this.productoValidator.validateCreate(
      tipoProductoId,
      medidaId,
    );

    if (validation.status === 'RESTORE') {
      return await this.productoDAO.restore(validation.id, precio);
    } else if (validation.status === 'CONFLICT') {
      throw new ConflictException(validation.message);
    } else {
      return this.productoDAO.create(
        precio,
        descripcion,
        tipoProductoId,
        medidaId,
      );
    }
  }

  async update(data: UpdateProductoDTO): Promise<ProductoEntity> {
    await this.productoValidator.ensureExistsById(data.id);
    return this.productoDAO.update(data);
  }

  async delete(id: number): Promise<void> {
    await this.productoValidator.ensureExistsById(id);
    await this.productoDAO.delete(id);
  }
}
