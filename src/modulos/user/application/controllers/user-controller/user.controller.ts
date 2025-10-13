import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UserService } from '../../services/user-service/user.service';
import { UserResponseMapper } from '../../mappersResponse/user-response-mapper/user-response.mapper';
import { CreateUserDto } from '../../dtos/user-dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userSerivice: UserService) {}

  @Get()
  async getUsers() {
    const users = await this.userSerivice.getAll();
    return users.map(UserResponseMapper.toResponse);
  }

  @Post()
  async crearUser(@Body() dto: CreateUserDto) {
    const user = await this.userSerivice.create(dto);

    return new ResponseDto(
      true,
      'User creada con éxito',
      UserResponseMapper.toResponse(user),
    );
  }
}
