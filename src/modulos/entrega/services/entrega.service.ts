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
import { CreateDetalleEntregaDTO } from '../dtos/detalleEntrega/create-detalle-entrega.dto';

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

  async generacionAutomaticaDeEntregas(): Promise<void> {
    const clientes = [1, 2, 3, 4];
    const usuarioId = 1;
    const precioNaftaId = 3;
    const productos = [
      { id: 1, precio: 1450 },
      { id: 2, precio: 1550 },
      { id: 3, precio: 1950 },
      { id: 4, precio: 2430 },
      { id: 5, precio: 70 },
      { id: 6, precio: 730 },
      { id: 7, precio: 1050 },
      { id: 8, precio: 3100 },
    ];
    for (let i = 0; i < 40; i++) {
      const clienteId = randomItem(clientes);
      const fecha = randomDate(new Date(2025, 8, 1), new Date(2025, 10, 7)); // sept-nov
      const litrosGastados = randomNumber(2, 10);

      const numDetalles = randomNumber(1, 3);
      const detalles: CreateDetalleEntregaDTO[] = [];

      for (let j = 0; j < numDetalles; j++) {
        const prod = randomItem(productos);
        detalles.push({
          cantidad: randomNumber(1, 10),
          precioUnitario: prod.precio,
          productoId: prod.id,
        });
      }
      const data: CreateEntregaDTO = {
        clienteId,
        usuarioId,
        precioNaftaId,
        litrosGastados,
        fecha,
        detalles,
      };

      await this.create(data);
    }

    function randomNumber(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomItem<T>(arr: T[]): T {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function randomDate(start: Date, end: Date): Date {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
      );
    }
  }
}
