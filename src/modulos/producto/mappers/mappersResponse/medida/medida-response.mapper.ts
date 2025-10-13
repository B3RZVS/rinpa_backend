import { MedidaEntity } from 'src/modulos/producto/entities/medidaEntity';
import { GetMedidaDTO } from '../../../dtos/medida/get-medida.dto';

export class MedidaResponseMapper {
  static toResponse(medida: MedidaEntity): GetMedidaDTO {
    return {
      id: medida.getId(),
      cantidad: medida.getCantidad(),
      unidadSimbolo: medida.getUnidadSimbolo() || '',
      unidadId: medida.getUnidadId(),
    };
  }
}
