import { Injectable, Inject } from '@nestjs/common';
import { UserIDAO } from 'src/modulos/user/infrastructure/interface/user.dao.interface';
import { UserValidator } from 'src/modulos/user/domain/validators/user-validator/user.validator';
import { UserEntity } from 'src/modulos/user/domain/entities/user-entity/user.entity';
import { CreateUserDto } from '../../dtos/user-dto/create-user.dto';
import { RolValidator } from 'src/modulos/user/domain/validators/rol-validator/rol.validator';
import { RolIDAO } from 'src/modulos/user/infrastructure/interface/rol.dao.interface';
import { hashPassword } from '../../functions/hashPassword.function';

@Injectable()
export class UserService {
  private readonly userValidator: UserValidator;
  private readonly rolValidator: RolValidator;
  constructor(
    @Inject('UserIDAO') private readonly userDAO: UserIDAO,
    @Inject('RolIDAO') private readonly rolDAO: RolIDAO,
  ) {
    this.userValidator = new UserValidator(this.userDAO);
    this.rolValidator = new RolValidator(this.rolDAO);
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userDAO.findAll();
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    await this.userValidator.ensureMailIsUnique(user.email);
    await this.rolValidator.ensureExistsById(user.rolId);
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    return this.userDAO.create(user);
  }

  async delete(id: number): Promise<void> {
    await this.userValidator.ensureExistsById(id);
    await this.userDAO.delete(id);
  }
}
