import { Inject, Injectable } from '@nestjs/common';
import { ProductoEntity } from 'src/modulos/producto/domain/entities/producto-entity/producto.entity';
import { ProductoValidator } from 'src/modulos/producto/domain/validators/producto-validator/producto.validator';
import { ProductoDAO } from 'src/modulos/producto/infrastructure/persistence/producto-DAO/producto.dao';

@Injectable()
export class ProductoService {
  private readonly productoValidator: ProductoValidator;
  constructor(
    @Inject('ProductoIDAO') private readonly productoDAO: ProductoDAO,
  ) {
    this.productoValidator = new ProductoValidator(this.productoDAO);
  }

  async getAll(): Promise<ProductoEntity[]> {
    return await this.productoDAO.findAll();
  }

  async create(
    precio: number,
    descripcion: string,
    tipoProductoId: number,
    medidaId: number,
  ): Promise<ProductoEntity> {
    await this.productoValidator.ensureNameIsUnique(
      tipoProductoId,
      medidaId,
      0,
    );
    return this.productoDAO.create(
      precio,
      descripcion,
      tipoProductoId,
      medidaId,
    );
  }

  async update(
    id: number,
    precio: number,
    descripcion: string,
  ): Promise<ProductoEntity> {
    await this.productoValidator.ensureExistsById(id);
    return this.productoDAO.update(id, precio, descripcion);
  }
  async delete(id: number): Promise<void> {
    await this.productoValidator.ensureExistsById(id);
    await this.productoDAO.delete(id);
  }
}
