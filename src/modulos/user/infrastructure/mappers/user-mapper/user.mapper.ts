import { UserEntity } from 'src/modulos/user/domain/entities/user-entity/user.entity';
import { Usuario as PrismaUser, Rol as PrismaRol } from '@prisma/client';
import { RolMapper } from '../rol-mapper/rol.mapper';

export class UserMapper {
  static toEntity(model: PrismaUser & { rol?: PrismaRol }): UserEntity {
    if (!model.rol) {
      throw new Error('Rol es requerido para crear UsuarioEntity');
    }
    const rolEntity = RolMapper.toEntity(model.rol);

    return new UserEntity(
      model.id,
      model.nombre,
      model.apellido,
      model.email,
      model.password,
      rolEntity,
    );
  }
}
