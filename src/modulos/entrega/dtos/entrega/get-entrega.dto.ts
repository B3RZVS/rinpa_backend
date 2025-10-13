import { GetDetalleEntregaDTO } from '../detalleEntrega/get-detalle-entrega.dto';

export interface GetEntregaDTO {
  id: number;
  clienteId: number;
  clienteNombre: string;
  clienteApellido: string;
  usuarioId: number;
  usuarioNombre: string;
  usuarioApellido: string;
  fecha: Date;
  precioNafta: number;
  litrosGastados: number;
  consumoTotal: number;
  detalles: GetDetalleEntregaDTO[];
}
