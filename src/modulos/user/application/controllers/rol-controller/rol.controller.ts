import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolService } from '../../services/rol-service/rol.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { RolResponseMapper } from '../../mappersResponse/rol-response-mapper/rol-response.mapper';
import { CreateRolDto } from '../../dtos/rol-dto/create-rol.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('rol')
export class RolController {
  constructor(private readonly rolSerivice: RolService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async getRol() {
    const roles = await this.rolSerivice.getAll();
    return roles.map(RolResponseMapper.toResponse);
  }

  @Post()
  async crearRol(@Body() dto: CreateRolDto) {
    const rol = await this.rolSerivice.create(dto);

    return new ResponseDto(
      true,
      'Rol creada con éxito',
      RolResponseMapper.toResponse(rol),
    );
  }
}
