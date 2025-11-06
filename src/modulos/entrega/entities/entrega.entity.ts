import { DetalleEntregaEntity } from './detalleEntrega.entity';
import { ClienteEntity } from 'src/modulos/cliente/entities/cliente.entity';
import { UserEntity } from 'src/modulos/user/domain/entities/user-entity/user.entity';
import { PrecioNaftaEntity } from './precioNafta.entity';

export class EntregaEntity {
  constructor(
    private id: number,
    private fecha: Date,
    private clienteId: number,
    private usuarioId: number,
    private precioNaftaId: number,
    private litrosGastados: number,
    private isDelete: boolean,
    private detalles: DetalleEntregaEntity[],
    private cliente?: ClienteEntity | null,
    private usuario?: UserEntity | null,
    private precioNafta?: PrecioNaftaEntity | null,
  ) {}

  getId() {
    return this.id;
  }
  getClienteId() {
    return this.clienteId;
  }

  getUsuarioId() {
    return this.usuarioId;
  }

  getPrecioNaftaId() {
    return this.precioNaftaId;
  }

  getDetalles() {
    return this.detalles;
  }

  getLitrosGastados() {
    return this.litrosGastados;
  }
  getFecha() {
    return this.fecha;
  }
  getIsDelete() {
    return this.isDelete;
  }

  getCliente() {
    return this.cliente;
  }

  getUsuario() {
    return this.usuario;
  }

  getPrecioNafta() {
    return this.precioNafta;
  }
}
