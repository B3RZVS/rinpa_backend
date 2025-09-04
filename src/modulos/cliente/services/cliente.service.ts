import { Inject, Injectable } from '@nestjs/common';
import { ClienteIDAO } from '../types/cliente.dao.interface';
import { ClienteValidator } from '../validators/cliente.validator';
import { ClienteEntity } from '../entities/cliente.entity';
import { CreateClienteDTO } from '../dtos/CreateCliente.dto';
import { UpdateClienteDTO } from '../dtos/UpdateCliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @Inject('ClienteIDAO') private readonly clienteDAO: ClienteIDAO,
    private readonly clienteValidator: ClienteValidator,
  ) {}

  async getAll(): Promise<ClienteEntity[]> {
    return await this.clienteDAO.findAll();
  }

  async create(data: CreateClienteDTO): Promise<ClienteEntity> {
    await this.clienteValidator.ensureExistsByEmail(data.email);
    return this.clienteDAO.create(data);
  }

  async update(data: UpdateClienteDTO, id: number): Promise<ClienteEntity> {
    await this.clienteValidator.ensureExistsById(id);
    return this.clienteDAO.update(data, id);
  }

  async delete(id: number): Promise<void> {
    await this.clienteValidator.ensureExistsById(id);
    await this.clienteDAO.delete(id);
  }
  async restore(id: number): Promise<void> {
    await this.clienteValidator.ensureExistsById(id);
    await this.clienteDAO.restore(id);
  }
}
