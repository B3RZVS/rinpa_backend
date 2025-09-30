import { Inject, Injectable } from '@nestjs/common';
import { EntregaIDAO } from '../types/entrega.dao.interface';
import { EntregaEntity } from '../entities/entrega.entity';
import { CreateEntregaDTO } from '../dtos/entrega/create-entrega.dto';

@Injectable()
export class EntregaService {
  constructor(
    @Inject('EntregaIDAO') private readonly entregaDAO: EntregaIDAO,
  ) {}

  async getAll(): Promise<EntregaEntity[]> {
    return await this.entregaDAO.findAll();
  }

  async create(data: CreateEntregaDTO): Promise<EntregaEntity> {
    const { detalles, ...entregaData } = data;

    return await this.entregaDAO.create(entregaData, detalles);
  }
}
