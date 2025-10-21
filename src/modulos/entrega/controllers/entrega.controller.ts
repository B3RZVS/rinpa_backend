import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EntregaService } from '../services/entrega.service';
import { ClienteService } from 'src/modulos/cliente/services/cliente.service';
import { UserService } from 'src/modulos/user/application/services/user-service/user.service';
import { PrecioNaftaService } from '../services/precio-nafta.service';
import { EntregaResponseMapper } from '../mappers/mappers-response/entrega-responde.mapper';
import { CreateEntregaDTO } from '../dtos/entrega/create-entrega.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { GetEntregaDTO } from '../dtos/entrega/get-entrega.dto';
import { UpdateEntregaDTO } from '../dtos/entrega/update-entrega.dto';

@Controller('entrega')
export class EntregaController {
  constructor(
    private readonly entregaService: EntregaService,
    private readonly clienteService: ClienteService,
    private readonly userService: UserService,
    private readonly precioNaftaService: PrecioNaftaService,
  ) {}

  @Get()
  async getEntregas() {
    const entregas = await this.entregaService.getAll();
    const entregaResponse: GetEntregaDTO[] = [];
    for (const entrega of entregas) {
      const cliente = await this.clienteService.getById(entrega.getClienteId());
      const user = await this.userService.getById(entrega.getUsuarioId());
      const precioNafta = await this.precioNaftaService.getById(
        entrega.getPrecioNaftaId(),
      );

      entregaResponse.push(
        EntregaResponseMapper.toResponse(
          entrega,
          cliente,
          user,
          precioNafta?.getPrecio() || null,
        ),
      );
    }
    return entregaResponse;
  }

  @Get(':id')
  async getEntregaById(@Param('id') id: number) {
    const entrega = await this.entregaService.getById(id);

    const cliente = await this.clienteService.getById(entrega.getClienteId());
    const user = await this.userService.getById(entrega.getUsuarioId());
    const precioNafta = await this.precioNaftaService.getById(
      entrega.getPrecioNaftaId(),
    );

    const entregaResponse = EntregaResponseMapper.toResponse(
      entrega,
      cliente,
      user,
      precioNafta?.getPrecio() || null,
    );

    return entregaResponse;
  }

  @Post()
  async crearEntrega(@Body() dto: CreateEntregaDTO) {
    const entrega = await this.entregaService.create(dto);

    return new ResponseDto(
      true,
      'Entrega creada con éxito',
      EntregaResponseMapper.toResponse(entrega),
    );
  }

  @Put(':id')
  async updateEntrega(@Param('id') id: number, @Body() dto: UpdateEntregaDTO) {
    const entrega = await this.entregaService.update(id, dto);

    return new ResponseDto(
      true,
      'Entrega actualizada con Exito',
      EntregaResponseMapper.toResponse(entrega),
    );
  }

  @Delete(':id')
  async deleteEntrega(@Param('id') id: number) {
    await this.entregaService.delete(id);
    return new ResponseDto(true, 'Entrega eliminada con Exito');
  }
}
