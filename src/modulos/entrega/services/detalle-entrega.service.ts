import { Inject, Injectable } from '@nestjs/common';
import { DetalleEntregaIDAO } from '../types/detalle.dao.interface';
import { CreateDetalleEntregaDTO } from '../dtos/detalleEntrega/create-detalle-entrega.dto';
import { DetalleEntregaEntity } from '../entities/detalleEntrega.entity';

@Injectable()
export class DetalleEntregaService {
  constructor(
    @Inject('DetalleEntregaIDAO')
    private readonly detalleDao: DetalleEntregaIDAO,
  ) {}

  async create(data: CreateDetalleEntregaDTO, entregaId: number) {
    return this.detalleDao.create(data, entregaId);
  }

  async update(id: number, cantidad: number): Promise<DetalleEntregaEntity> {
    return await this.detalleDao.update(id, cantidad);
  }

  async delete(id: number) {
    await this.detalleDao.delete(id);
  }
}
