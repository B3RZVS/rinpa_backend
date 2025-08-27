import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { MedidaIDAO } from 'src/modulos/producto/infrastructure/datoTypes/medida-IDAO/medida.dao.interface';

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
  ): Promise<void> {
    const exists = await this.medidaDAO.findByCantidad(cantidad, unidadID);
    const unidad = exists?.getUnidadSimbolo();
    if (exists && exists.getId() !== idToExclude) {
      throw new ConflictException(`La medida ${cantidad} ${unidad} ya existe.`);
    }
  }
}
