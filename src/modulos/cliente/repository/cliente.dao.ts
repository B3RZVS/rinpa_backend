import { Injectable } from '@nestjs/common';
import { ClienteIDAO } from '../types/cliente.dao.interface';
import { ClienteEntity } from '../entities/cliente.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClienteMappers } from '../mappers/cliente.mapper';
import { CreateClienteDTO } from '../dtos/CreateCliente.dto';
import { UpdateClienteDTO } from '../dtos/UpdateCliente.dto';

@Injectable()
export class ClienteDAO implements ClienteIDAO {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ClienteEntity[]> {
    const clientes = await this.prisma.cliente.findMany({
      where: { isDeleted: false },
    });
    return clientes.map(ClienteMappers.toEntity);
  }

  async create(data: CreateClienteDTO): Promise<ClienteEntity> {
    const cliente = await this.prisma.cliente.create({ data });
    return ClienteMappers.toEntity(cliente);
  }

  async update(data: UpdateClienteDTO, id: number): Promise<ClienteEntity> {
    const cliente = await this.prisma.cliente.update({
      where: { id },
      data,
    });

    if (!cliente) {
      throw new Error('Error al modificar el cliente');
    }
    return ClienteMappers.toEntity(cliente);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.cliente.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
  async restore(id: number): Promise<void> {
    await this.prisma.cliente.update({
      where: { id },
      data: { isDeleted: false },
    });
  }

  async findByEmail(email: string): Promise<ClienteEntity | null> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { email: email },
    });
    return cliente ? ClienteMappers.toEntity(cliente) : null;
  }

  async findById(id: number): Promise<ClienteEntity | null> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
    });
    return cliente ? ClienteMappers.toEntity(cliente) : null;
  }
}
