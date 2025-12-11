import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { ITipoProductoDAO } from 'src/modulos/producto/types/tipo-producto.dao.interface';
import { ValidationResult } from '../types/validator.type';

@Injectable()
export class TipoProductoValidator {
  constructor(
    @Inject('ITipoProductoDAO')
    private readonly tipoProductoDAO: ITipoProductoDAO,
  ) {}

  /**
   * Verifica que el TipoProducto exista por ID
   */
  async ensureExistsById(id: number): Promise<void> {
    const exists = await this.tipoProductoDAO.findById(id);
    if (!exists) {
      throw new ConflictException(
        `El tipo de producto con ID '${id}' no existe.`,
      );
    }
  }

  /**
   * Verifica que el nombre del TipoProducto sea único (excluyendo un ID opcional)
   */
  async ensureNameIsUnique(
    name: string,
    idToExclude?: number,
  ): Promise<ValidationResult> {
    const existing = await this.tipoProductoDAO.findByNombre(name);

    if (existing && existing.isDelete()) {
      return { status: 'RESTORE', id: existing.getId() };
    }
    if (existing && existing.getId() !== idToExclude) {
      return {
        status: 'CONFLICT',
        message: `El tipo de producto con nombre '${name}' ya existe.`,
      };
    }
    return { status: 'OK' };
  }
}
