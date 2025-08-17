import { RolEntity } from 'src/modulos/user/domain/entities/rol-entity/rol.entity';
import { GetRolDto } from '../../dtos/rol-dto/get-rol.dto';
import { UserEntity } from 'src/modulos/user/domain/entities/user-entity/user.entity';
import { GetUserDto } from '../../dtos/user-dto/get-user.dto';
import { RolResponseMapper } from '../rol-response-mapper/rol-response.mapper';
export class UserResponseMapper {
  static toResponse(user: UserEntity): GetUserDto {
    const rol = RolResponseMapper.toResponse(user.getRol());
    return {
      id: user.getId(),
      nombre: user.getNombre(),
      apellido: user.getApellido(),
      email: user.getEmail(),
      rol: rol,
    };
  }
}
