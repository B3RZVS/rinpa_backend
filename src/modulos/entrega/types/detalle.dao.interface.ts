import { DetalleEntregaEntity } from '../entities/detalleEntrega.entity';

export interface DetalleEntregaIDAO {
  findAll(): Promise<DetalleEntregaEntity[]>;
  create(cantidad: number, unidad: number): Promise<DetalleEntregaEntity>;
  update(
    id: number,
    cantidad: number,
    unidad: number,
  ): Promise<DetalleEntregaEntity>;
  delete(id: number): Promise<void>;

  findById(id: number): Promise<DetalleEntregaEntity | null>;
}
