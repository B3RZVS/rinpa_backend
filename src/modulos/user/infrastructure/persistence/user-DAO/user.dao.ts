import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/modulos/user/domain/entities/user-entity/user.entity';
import { UserMapper } from '../../mappers/user-mapper/user.mapper';
import { UserIDAO } from '../../interface/user.dao.interface';
import { CreateRolDto } from 'src/modulos/user/application/dtos/rol-dto/create-rol.dto';
import { CreateUserDto } from 'src/modulos/user/application/dtos/user-dto/create-user.dto';

@Injectable()
export class UserDAO implements UserIDAO {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.usuario.findMany({
      include: { rol: true },
    });
    return users.map(UserMapper.toEntity);
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      include: { rol: true },
    });
    return user ? UserMapper.toEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
      include: { rol: true },
    });
    return user ? UserMapper.toEntity(user) : null;
  }

  async create(userData: CreateUserDto): Promise<UserEntity> {
    const user = await this.prisma.usuario.create({
      data: { ...userData },
      include: { rol: true },
    });
    return UserMapper.toEntity(user);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.usuario.delete({
      where: { id },
    });
  }
}
