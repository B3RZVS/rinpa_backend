import { Inject, Injectable } from '@nestjs/common';
import { UnidadIDAO } from 'src/modulos/producto/types/unidad.dao.interface';
import { UnidadValidator } from 'src/modulos/producto/validators/unidad.validator';
import { UnidadEntity } from 'src/modulos/producto/entities/Unidad.entity';
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
