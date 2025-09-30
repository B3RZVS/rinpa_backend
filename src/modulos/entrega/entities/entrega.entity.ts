import { DetalleEntregaEntity } from './detalleEntrega.entity';

export class EntregaEntity {
  constructor(
    private id: number,
    private fecha: Date,
    private clienteId: number,
    private usuarioId: number,
    private precioNaftaId: number,
    private litrosGastados: number,
    private detalles: DetalleEntregaEntity[],
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
}
