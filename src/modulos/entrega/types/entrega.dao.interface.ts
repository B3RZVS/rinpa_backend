import { CreateDetalleEntregaDTO } from '../dtos/detalleEntrega/create-detalle-entrega.dto';
import { CreateEntrega } from '../dtos/entrega/create-entrega.dto';
import { UpdateEntregaDTO } from '../dtos/entrega/update-entrega.dto';
import { EntregaEntity } from '../entities/entrega.entity';

export interface EntregaIDAO {
  findAll(): Promise<EntregaEntity[]>;
  create(
    data: CreateEntrega,
    detalles: CreateDetalleEntregaDTO[],
  ): Promise<EntregaEntity>;
  update(id: number, data: UpdateEntregaDTO): Promise<EntregaEntity>;
  delete(id: number): Promise<void>;

  // findById(id: number): Promise<EntregaEntity | null>;
}
