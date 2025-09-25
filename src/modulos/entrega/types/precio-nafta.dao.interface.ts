import { CreatePrecioNaftaDTO } from '../dtos/precioNafta/create-precio-nafta.dto';
import { PrecioNaftaEntity } from '../entities/precioNafta.entity';

export interface PrecioNaftaIDAO {
  findAll(): Promise<PrecioNaftaEntity[]>;
  create(data: CreatePrecioNaftaDTO): Promise<PrecioNaftaEntity>;
  findByDateEndIsNull(): Promise<PrecioNaftaEntity | null>;
  setDateEnd(data: PrecioNaftaEntity): void;
}
