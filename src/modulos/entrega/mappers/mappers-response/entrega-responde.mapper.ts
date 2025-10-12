import { EntregaEntity } from '../../entities/entrega.entity';
import { GetEntregaDTO } from '../../dtos/entrega/get-entrega.dto';
import { DetalleEntregaResponseMapper } from './detalle-entrega.mapper';
import { ClienteEntity } from 'src/modulos/cliente/entities/cliente.entity';
import { UserEntity } from 'src/modulos/user/domain/entities/user-entity/user.entity';

export class EntregaResponseMapper {
  static toResponse(
    entrega: EntregaEntity,
    cliente?: ClienteEntity | null,
    usuario?: UserEntity | null,
    precioNafta?: number | null,
  ): GetEntregaDTO {
    const detalles = entrega
      .getDetalles()
      .map((detalle) => DetalleEntregaResponseMapper.toResponse(detalle));

    return {
      id: entrega.getId(),
      clienteId: entrega.getClienteId(),
      clienteNombre: cliente?.getNombre() || '',
      usuarioId: entrega.getUsuarioId(),
      usuarioNombre: usuario?.getNombre() || '',
      fecha: entrega.getFecha(),
      precioNafta: precioNafta || 0,
      litrosGastados: entrega.getLitrosGastados(),
      consumoTotal: entrega.getLitrosGastados() * precioNafta! || 0,
      detalles,
    };
  }
}
