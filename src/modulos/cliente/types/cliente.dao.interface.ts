import { CreateClienteDTO } from '../dtos/CreateCliente.dto';
import { UpdateClienteDTO } from '../dtos/UpdateCliente.dto';
import { ClienteEntity } from '../entities/cliente.entity';

export interface ClienteIDAO {
  findAll(): Promise<ClienteEntity[]>;
  create(data: CreateClienteDTO): Promise<ClienteEntity>;
  update(data: UpdateClienteDTO, id: number): Promise<ClienteEntity>;
  delete(id: number): Promise<void>;
  restore(id: number): Promise<void>;
  findByEmail(email: string): Promise<ClienteEntity | null>;

  findById(id: number): Promise<ClienteEntity | null>;
}
