import { Injectable, Inject, Body, ConflictException } from '@nestjs/common';
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
    const validation = await this.medidaValidator.ensureNameIsUnique(
      cantidad,
      unidadId,
      0,
    );
    if (validation.status === 'RESTORE') {
      return await this.medidaDAO.restore(validation.id);
    } else if (validation.status === 'CONFLICT') {
      throw new ConflictException(validation.message);
    } else {
      return this.medidaDAO.create(cantidad, unidadId);
    }
  }
  async update(
    id: number,
    cantidad: number,
    unidadId: number,
  ): Promise<MedidaEntity> {
    await this.medidaValidator.ensureExistsById(id);
    const validation = await this.medidaValidator.ensureNameIsUnique(
      cantidad,
      unidadId,
      id,
    );
    if (validation.status === 'CONFLICT') {
      throw new ConflictException(validation.message);
    }
    return this.medidaDAO.update(id, cantidad, unidadId);
  }
  async delete(id: number): Promise<void> {
    await this.medidaValidator.ensureExistsById(id);
    await this.medidaDAO.delete(id);
  }
}
