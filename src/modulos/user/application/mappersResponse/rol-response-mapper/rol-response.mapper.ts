import { RolEntity } from 'src/modulos/user/domain/entities/rol-entity/rol.entity';
import { GetRolDto } from '../../dtos/rol-dto/get-rol.dto';

export class RolResponseMapper {
  static toResponse(rol: RolEntity): GetRolDto {
    return {
      id: rol.getId(),
      nombre: rol.getNombre(),
    };
  }
}
