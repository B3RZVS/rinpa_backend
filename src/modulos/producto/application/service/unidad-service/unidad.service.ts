import { Inject, Injectable } from '@nestjs/common';
import { UnidadIDAO } from 'src/modulos/producto/infrastructure/datoTypes/unidad-IDAO/unidad.dao.interface';
import { UnidadValidator } from 'src/modulos/producto/domain/validators/unidad-validator/unidad.validator';
import { UnidadEntity } from 'src/modulos/producto/domain/entities/unidad-entity/Unidad.entity';
@Injectable()
export class UnidadService {
  constructor(
    @Inject('UnidadIDAO') private readonly unidadDAO: UnidadIDAO,
    private readonly validatorUnidad: UnidadValidator,
  ) {}

  async getAll(): Promise<UnidadEntity[]> {
    return this.unidadDAO.findAll();
  }

  async create(nombre: string, simbolo: string): Promise<UnidadEntity> {
    await this.validatorUnidad.ensureNameIsUnique(nombre);
    return this.unidadDAO.create(nombre, simbolo);
  }
}
