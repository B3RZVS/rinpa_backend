import { GetDetalleEntregaDTO } from '../detalleEntrega/get-detalle-entrega.dto';

export interface GetEntregaDTO {
  id: number;
  clienteId: number;
  clienteNombre: string;
  usuarioId: number;
  usuarioNombre: string;
  fecha: Date;
  precioNafta: number;
  litrosGastados: number;
  consumoTotal: number;
  detalles: GetDetalleEntregaDTO[];
}
