import { MedidaEntity } from '../../entities/medida-entity/medidaEntity';

export interface MedidaIDAO {
  findAll(): Promise<MedidaEntity[]>;
  create(cantidad: number, unidad: number): Promise<MedidaEntity>;
  update(id: number, cantidad: number, unidad: number): Promise<MedidaEntity>;
  delete(id: number): Promise<void>;
  findByCantidad(
    cantidad: number,
    unidadId: number,
  ): Promise<MedidaEntity | null>;
  findById(id: number): Promise<MedidaEntity | null>;
}
