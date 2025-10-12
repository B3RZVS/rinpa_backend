import { Inject, Injectable } from '@nestjs/common';
import { EntregaIDAO } from '../types/entrega.dao.interface';
import { EntregaEntity } from '../entities/entrega.entity';
import { CreateEntregaDTO } from '../dtos/entrega/create-entrega.dto';
import { UpdateEntregaDTO } from '../dtos/entrega/update-entrega.dto';
import { DetalleEntregaIDAO } from '../types/detalle.dao.interface';
import { AuthValidator } from 'src/modulos/auth/application/validators/auth.validator';
import { ClienteValidator } from 'src/modulos/cliente/validators/cliente.validator';
import { EntregaValidator } from '../validators/entrega.validator';

@Injectable()
export class EntregaService {
  constructor(
    @Inject('EntregaIDAO') private readonly entregaDAO: EntregaIDAO,
    @Inject('DetalleEntregaIDAO')
    private readonly detalleEntregaDAO: DetalleEntregaIDAO,
    private readonly userValidator: AuthValidator,
    private readonly clienteValidator: ClienteValidator,
    private readonly entregaValidator: EntregaValidator,
  ) {}

  async getAll(): Promise<EntregaEntity[]> {
    return await this.entregaDAO.findAll();
  }

  async create(data: CreateEntregaDTO): Promise<EntregaEntity> {
    const { detalles, ...entregaData } = data;
    //Validacion de usuario
    await this.userValidator.ensureExistsById(entregaData.usuarioId);

    //Validacion de cliente
    await this.clienteValidator.ensureExistsById(entregaData.clienteId);

    //Creacion de la entrega
    const entrega = await this.entregaDAO.create(entregaData);
    //Creacion de los detalles
    await this.detalleEntregaDAO.create(detalles, entrega.getId());
    //Obtener la entrega con los detalles
    const entregaConDetalle = await this.entregaDAO.findById(entrega.getId());

    if (!entregaConDetalle) {
      throw new Error('Error al buscar la Entrega creada');
    }
    return entregaConDetalle;
  }

  async update(id: number, data: UpdateEntregaDTO): Promise<EntregaEntity> {
    this.entregaValidator.ensureExistsById(id);
    return await this.entregaDAO.update(id, data);
  }

  async delete(id: number) {
    this.entregaValidator.ensureExistsById(id);
    await this.entregaDAO.delete(id);
  }
}
