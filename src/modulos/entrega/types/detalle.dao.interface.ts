import { CreateDetalleEntregaDTO } from '../dtos/detalleEntrega/create-detalle-entrega.dto';
import { DetalleEntregaEntity } from '../entities/detalleEntrega.entity';

export interface DetalleEntregaIDAO {
  findAll(entregaId: number): Promise<DetalleEntregaEntity[]>;
  create(
    data: CreateDetalleEntregaDTO | CreateDetalleEntregaDTO[],
    entregaId: number,
  ): void;
  update(id: number, cantidad: number): Promise<DetalleEntregaEntity>;
  delete(id: number): Promise<void>;

  findById(id: number): Promise<DetalleEntregaEntity | null>;
}
