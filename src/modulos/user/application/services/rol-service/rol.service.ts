import { Injectable, Inject, Body } from '@nestjs/common';
import { RolValidator } from 'src/modulos/user/domain/validators/rol-validator/rol.validator';
import { RolEntity } from 'src/modulos/user/domain/entities/rol-entity/rol.entity';
import { CreateRolDto } from '../../dtos/rol-dto/create-rol.dto';
import { RolIDAO } from 'src/modulos/user/infrastructure/interface/rol.dao.interface';

@Injectable()
export class RolService {
  private readonly rolValidator: RolValidator;
  constructor(@Inject('RolIDAO') private readonly rolDAO: RolIDAO) {
    this.rolValidator = new RolValidator(this.rolDAO);
  }

  async getAll(): Promise<RolEntity[]> {
    return await this.rolDAO.findAll();
  }

  async create(rol: CreateRolDto): Promise<RolEntity> {
    return this.rolDAO.create(rol.nombre);
  }

  async delete(id: number): Promise<void> {
    await this.rolValidator.ensureExistsById(id);
    await this.rolDAO.delete(id);
  }
}
