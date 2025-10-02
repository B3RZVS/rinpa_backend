import { Inject, Injectable } from '@nestjs/common';
import { EntregaIDAO } from '../types/entrega.dao.interface';
import { EntregaEntity } from '../entities/entrega.entity';
import { CreateEntregaDTO } from '../dtos/entrega/create-entrega.dto';
import { UpdateEntregaDTO } from '../dtos/entrega/update-entrega.dto';

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

  async update(id: number, data: UpdateEntregaDTO): Promise<EntregaEntity> {
    return await this.entregaDAO.update(id, data);
  }

  async delete(id: number) {
    await this.entregaDAO.delete(id);
  }
}
