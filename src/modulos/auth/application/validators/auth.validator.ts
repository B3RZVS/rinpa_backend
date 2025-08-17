import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/modulos/user/domain/entities/user-entity/user.entity';
import { UserIDAO } from 'src/modulos/user/infrastructure/interface/user.dao.interface';
import * as bcrypt from 'bcrypt';
import { ConflictException, Inject } from '@nestjs/common';

export class AuthValidator {
  constructor(@Inject('UserIDAO') private readonly userDAO: UserIDAO) {}

  async validateUser(email: string, password?: string): Promise<UserEntity> {
    const user = await this.userDAO.findByEmail(email);
    if (!user) {
      throw new ConflictException(`El usuario con email ${email} no existe.`);
    }

    if (password) {
      const passwordMatch = await bcrypt.compare(password, user.getPassword());
      if (!passwordMatch) {
        throw new ConflictException(`Contraseña incorrecta`);
      }
    }

    return user;
  }
}
