import { Inject, Injectable } from '@nestjs/common';
import { UnidadIDAO } from 'src/modulos/producto/domain/ports/unidad-IDAO/unidad.dao.interface';
import { UnidadValidator } from 'src/modulos/producto/domain/validators/unidad-validator/unidad.validator';
import { UnidadEntity } from 'src/modulos/producto/domain/entities/unidad-entity/Unidad.entity';
@Injectable()
export class UnidadService {
  private readonly validatorUnidad: UnidadValidator;

  constructor(@Inject('UnidadIDAO') private readonly unidadDAO: UnidadIDAO) {
    this.validatorUnidad = new UnidadValidator(unidadDAO);
  }

  async getAll(): Promise<UnidadEntity[]> {
    return this.unidadDAO.findAll();
  }

  async create(nombre: string, simbolo: string): Promise<UnidadEntity> {
    await this.validatorUnidad.ensureNameIsUnique(nombre);
    return this.unidadDAO.create(nombre, simbolo);
  }
}
