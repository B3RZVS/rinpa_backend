import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UnidadIDAO } from '../../ports/unidad-IDAO/unidad.dao.interface';

@Injectable()
export class UnidadValidator {
  constructor(@Inject('UnidadIDAO') private readonly unidadDAO: UnidadIDAO) {}

  /**
   * Verifica que la Unidad exista por ID
   */
  async ensureExistsById(id: number): Promise<void> {
    const exists = await this.unidadDAO.findById(id);
    if (!exists) {
      throw new ConflictException(`La unidad con ID '${id}' no existe.`);
    }
  }

  /**
   * Verifica que el nombre de la Unidad sea único (excluyendo un ID opcional)
   */
  async ensureNameIsUnique(name: string, idToExclude?: number): Promise<void> {
    const exists = await this.unidadDAO.findByNombre(name);

    if (exists && exists.getId() !== idToExclude) {
      throw new ConflictException(`La unidad con nombre '${name}' ya existe.`);
    }
  }
}
