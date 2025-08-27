import { RolEntity } from 'src/modulos/user/domain/entities/rol-entity/rol.entity';
import { Rol as PrismaRol } from '@prisma/client';

export class RolMapper {
  static toEntity(model: PrismaRol): RolEntity {
    return new RolEntity(model.id, model.nombre);
  }
}
