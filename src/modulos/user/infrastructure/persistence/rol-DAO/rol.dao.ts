import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolEntity } from 'src/modulos/user/domain/entities/rol-entity/rol.entity';
import { RolMapper } from '../../mappers/rol-mapper/rol.mapper';
import { RolIDAO } from '../../interface/rol.dao.interface';

@Injectable()
export class RolDAO implements RolIDAO {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<RolEntity[]> {
    const roles = await this.prisma.rol.findMany();
    return roles.map(RolMapper.toEntity);
  }

  async findById(id: number): Promise<RolEntity | null> {
    const rol = await this.prisma.rol.findUnique({
      where: { id },
    });
    return rol ? RolMapper.toEntity(rol) : null;
  }
  async create(nombre: string): Promise<RolEntity> {
    const rol = await this.prisma.rol.create({ data: { nombre } });

    return RolMapper.toEntity(rol);
  }
  async delete(id: number): Promise<void> {
    await this.prisma.rol.delete({
      where: { id },
    });
  }
}
