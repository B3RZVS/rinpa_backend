import { Inject, Injectable } from '@nestjs/common';
import { PrecioNaftaIDAO } from '../types/precio-nafta.dao.interface';
import { PrecioNaftaEntity } from '../entities/precioNafta.entity';
import { CreatePrecioNaftaDTO } from '../dtos/precioNafta/create-precio-nafta.dto';

@Injectable()
export class PrecioNaftaService {
  constructor(
    @Inject('PrecioNaftaIDAO') private readonly precioNaftaDAO: PrecioNaftaIDAO,
  ) {}

  async getAll(): Promise<PrecioNaftaEntity[]> {
    return await this.precioNaftaDAO.findAll();
  }

  async create(data: CreatePrecioNaftaDTO): Promise<PrecioNaftaEntity> {
    const precioActual = await this.precioNaftaDAO.findByDateEndIsNull();
    if (precioActual) {
      this.precioNaftaDAO.setDateEnd(precioActual);
    }
    return await this.precioNaftaDAO.create(data);
  }
}
