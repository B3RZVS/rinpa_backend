import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ClienteService } from '../../services/cliente.service';
import { ClienteMappers } from '../../mappers/cliente.mapper';
import { CreateClienteDTO } from '../../dtos/CreateCliente.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UpdateClienteDTO } from '../../dtos/UpdateCliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  async GetClientes() {
    const clientes = await this.clienteService.getAll();
    return clientes.map(ClienteMappers.toResponse);
  }

  @Post()
  async createCliente(@Body() dto: CreateClienteDTO) {
    await this.clienteService.create(dto);
    return new ResponseDto(true, 'Cliente creado exitosamente');
  }

  @Put(':id')
  async updateCliente(@Param('id') id: string, @Body() dto: UpdateClienteDTO) {
    await this.clienteService.update(dto, Number(id));
    return new ResponseDto(true, 'Cliente modificado exitosamente');
  }

  @Delete(':id')
  async deleteCliente(@Param('id') id: string) {
    await this.clienteService.delete(Number(id));
    return new ResponseDto(true, 'Cliente eliminado exitosamente');
  }

  @Patch(':id')
  async restoreCliente(@Param('id') id: string) {
    await this.clienteService.restore(Number(id));
    return new ResponseDto(true, 'Cliente restaurado exitosamente');
  }
}
