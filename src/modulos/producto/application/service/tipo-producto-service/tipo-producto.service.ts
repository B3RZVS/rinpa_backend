import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { TipoProductoEntity } from '../../../domain/entities/tipo-producto-entity/tipo-producto.entity';
import { TipoProductoValidator } from '../../../domain/validators/tipo-producto-validator/tipo-producto.validator';
import { ITipoProductoDAO } from 'src/modulos/producto/infrastructure/datoTypes/tipo-producto-IDAO/tipo-producto.dao.interface';

@Injectable()
export class TipoProductoService {
  private readonly validator: TipoProductoValidator;

  constructor(
    @Inject('ITipoProductoDAO')
    private readonly tipoProductoDAO: ITipoProductoDAO,
  ) {
    this.validator = new TipoProductoValidator(tipoProductoDAO);
  }

  async getAll(): Promise<TipoProductoEntity[]> {
    return this.tipoProductoDAO.findAll();
  }

  async create(nombre: string): Promise<TipoProductoEntity> {
    await this.validator.ensureNameIsUnique(nombre);
    return this.tipoProductoDAO.create(nombre);
  }

  async update(id: number, nuevoNombre: string): Promise<TipoProductoEntity> {
    await this.validator.ensureExistsById(id);
    await this.validator.ensureNameIsUnique(nuevoNombre, id);
    return await this.tipoProductoDAO.update(id, nuevoNombre);
  }

  async delete(id: number): Promise<void> {
    await this.validator.ensureExistsById(id);
    return this.tipoProductoDAO.delete(id);
  }
}
