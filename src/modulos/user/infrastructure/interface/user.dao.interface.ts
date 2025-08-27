import { CreateUserDto } from '../../application/dtos/user-dto/create-user.dto';
import { UserEntity } from '../../domain/entities/user-entity/user.entity';

export interface UserIDAO {
  findAll(): Promise<UserEntity[]>;
  findById(id: number): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  create(userData: CreateUserDto): Promise<UserEntity>;
  // update(id: number, cantidad: number, unidad: number): Promise<MedidaEntity>;
  delete(id: number): Promise<void>;
}
