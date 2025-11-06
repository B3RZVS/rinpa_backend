import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { EntregaIDAO } from '../types/entrega.dao.interface';
import { EntregaEntity } from '../entities/entrega.entity';
import { CreateEntregaDTO } from '../dtos/entrega/create-entrega.dto';
import { UpdateEntregaDTO } from '../dtos/entrega/update-entrega.dto';
import { DetalleEntregaIDAO } from '../types/detalle.dao.interface';
import { AuthValidator } from 'src/modulos/auth/application/validators/auth.validator';
import { ClienteValidator } from 'src/modulos/cliente/validators/cliente.validator';
import { EntregaValidator } from '../validators/entrega.validator';
import { queryBuilder } from 'src/common/pagination/query-builder.util';
import { QueryParamsDto } from 'src/common/pagination/queryParams.dto';

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

  async getAllPaginated(params: QueryParamsDto) {
    return queryBuilder<EntregaEntity>(
      (where, skip, take) =>
        this.entregaDAO.findAllPaginated(where, skip, take),
      params,
    );
  }

  async getById(id: number): Promise<EntregaEntity> {
    const entregaConDetalle = await this.entregaDAO.findById(id);

    if (!entregaConDetalle) {
      throw new ConflictException(`Entrega con id ${id} no encontrada`);
    }
    return entregaConDetalle;
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
    //Obtener la entrega con los detalles y relaciones
    const entregaConDetalle = await this.entregaDAO.findById(entrega.getId());

    if (!entregaConDetalle) {
      throw new ConflictException(
        `Error al buscar la Entrega creada con id ${entrega.getId()}`,
      );
    }
    return entregaConDetalle;
  }

  async update(id: number, data: UpdateEntregaDTO): Promise<EntregaEntity> {
    await this.entregaValidator.ensureExistsById(id);
    return await this.entregaDAO.update(id, data);
  }

  async delete(id: number) {
    await this.entregaValidator.ensureExistsById(id);
    await this.entregaDAO.delete(id);
  }
}
