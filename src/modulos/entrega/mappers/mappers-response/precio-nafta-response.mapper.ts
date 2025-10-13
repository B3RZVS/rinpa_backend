import { PrecioNaftaEntity } from '../../entities/precioNafta.entity';
import { GetPrecioNaftaDTO } from '../../dtos/precioNafta/get-precio-nafta.dao';

export class PrecioNaftaResponseMapper {
  static toResponse(precio: PrecioNaftaEntity): GetPrecioNaftaDTO {
    return {
      id: precio.getId(),
      precio: precio.getPrecio(),
      fechaInicio: precio.getFechaInicio(),
      fechaFin: precio.getFechaFin(),
    };
  }
}
