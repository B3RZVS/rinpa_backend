import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { TipoProductoEntity } from '../../entities/tipo-producto.entity';
import { TipoProductoValidator } from '../../validators/tipo-producto.validator';
import { ITipoProductoDAO } from 'src/modulos/producto/types/tipo-producto.dao.interface';

@Injectable()
export class TipoProductoService {
  constructor(
    @Inject('ITipoProductoDAO')
    private readonly tipoProductoDAO: ITipoProductoDAO,
    private readonly validator: TipoProductoValidator,
  ) {}

  async getAll(): Promise<TipoProductoEntity[]> {
    return this.tipoProductoDAO.findAll();
  }

  async create(nombre: string): Promise<TipoProductoEntity> {
    const validation = await this.validator.ensureNameIsUnique(nombre);
    if (validation.status === 'RESTORE') {
      return await this.tipoProductoDAO.restore(validation.id);
    } else if (validation.status === 'CONFLICT') {
      throw new ConflictException(validation.message);
    } else {
      return this.tipoProductoDAO.create(nombre);
    }
  }

  async update(id: number, nuevoNombre: string): Promise<TipoProductoEntity> {
    await this.validator.ensureExistsById(id);
    const validation = await this.validator.ensureNameIsUnique(nuevoNombre, id);
    if (validation.status === 'CONFLICT') {
      throw new ConflictException(validation.message);
    }
    return await this.tipoProductoDAO.update(id, nuevoNombre);
  }

  async delete(id: number): Promise<void> {
    await this.validator.ensureExistsById(id);
    return this.tipoProductoDAO.delete(id);
  }
}
