import { Injectable, Inject, Body } from '@nestjs/common';
import { MedidaValidator } from 'src/modulos/producto/validators/medida.validator';
import { MedidaEntity } from 'src/modulos/producto/entities/medidaEntity';
import { MedidaIDAO } from 'src/modulos/producto/types/medida.dao.interface';

@Injectable()
export class MedidaService {
  private readonly medidaValidator: MedidaValidator;
  constructor(@Inject('MedidaIDAO') private readonly medidaDAO: MedidaIDAO) {
    this.medidaValidator = new MedidaValidator(this.medidaDAO);
  }

  async getAll(): Promise<MedidaEntity[]> {
    return await this.medidaDAO.findAll();
  }

  async create(cantidad: number, unidadId: number): Promise<MedidaEntity> {
    await this.medidaValidator.ensureNameIsUnique(cantidad, unidadId, 0);
    return this.medidaDAO.create(cantidad, unidadId);
  }
  async update(
    id: number,
    cantidad: number,
    unidadId: number,
  ): Promise<MedidaEntity> {
    await this.medidaValidator.ensureExistsById(id);
    await this.medidaValidator.ensureNameIsUnique(cantidad, unidadId, id);
    return this.medidaDAO.update(id, cantidad, unidadId);
  }
  async delete(id: number): Promise<void> {
    await this.medidaValidator.ensureExistsById(id);
    await this.medidaDAO.delete(id);
  }
}
