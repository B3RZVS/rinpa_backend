import { MedidaEntity } from 'src/modulos/producto/domain/entities/medida-entity/medidaEntity';
import { GetMedidaDTO } from '../../dtos/medida-dto/get-medida.dto';

export class MedidaResponseMapper {
  static toResponse(medida: MedidaEntity): GetMedidaDTO {
    return {
      id: medida.getId(),
      cantidad: medida.getCantidad(),
      unidadSimbolo: medida.getUnidadSimbolo() || '',
    };
  }
}
