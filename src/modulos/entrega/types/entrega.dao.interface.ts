import { CreateEntregaDTO } from '../dtos/entrega/create-entrega.dto';
import { EntregaEntity } from '../entities/entrega.entity';

export interface EntregaIDAO {
  findAll(): Promise<EntregaEntity[]>;
  create(data: CreateEntregaDTO): Promise<EntregaEntity>;
  update(id: number, cantidad: number, unidad: number): Promise<EntregaEntity>;
  delete(id: number): Promise<void>;

  findById(id: number): Promise<EntregaEntity | null>;
}
