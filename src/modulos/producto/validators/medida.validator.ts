import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { MedidaIDAO } from 'src/modulos/producto/types/medida.dao.interface';
import { ValidationResult } from '../types/validator.type';

@Injectable()
export class MedidaValidator {
  constructor(@Inject('MedidaIDAO') private readonly medidaDAO: MedidaIDAO) {}

  /**
   * Verifica que la Medida exista por ID
   */
  async ensureExistsById(id: number): Promise<void> {
    const exists = await this.medidaDAO.findById(id);
    if (!exists) {
      throw new ConflictException(`La medida con ID '${id}' no existe.`);
    }
  }

  /**
   * Verifica que la combinacion medida y unidad sea único (excluyendo un ID opcional)
   */
  async ensureNameIsUnique(
    cantidad: number,
    unidadID: number,
    idToExclude: number,
  ): Promise<ValidationResult> {
    const exists = await this.medidaDAO.findByCantidad(cantidad, unidadID);

    if (exists && exists.isDelete()) {
      return { status: 'RESTORE', id: exists.getId() };
    }
    const unidad = exists?.getUnidadSimbolo();
    if (exists && exists.getId() !== idToExclude) {
      return {
        status: 'CONFLICT',
        message: `La medida ${cantidad} ${unidad} ya existe.`,
      };
    }
    return { status: 'OK' };
  }
}
