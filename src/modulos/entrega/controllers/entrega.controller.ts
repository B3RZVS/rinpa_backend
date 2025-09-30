import { Body, Controller, Get, Post } from '@nestjs/common';
import { EntregaService } from '../services/entrega.service';
import { ClienteService } from 'src/modulos/cliente/services/cliente.service';
import { UserService } from 'src/modulos/user/application/services/user-service/user.service';
import { PrecioNaftaService } from '../services/precio-nafta.service';
import { EntregaResponseMapper } from '../mappers/mappers-response/entrega-responde.mapper';
import { CreateEntregaDTO } from '../dtos/entrega/create-entrega.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { GetEntregaDTO } from '../dtos/entrega/get-entrega.dto';

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

  @Post()
  async crearEntrega(@Body() dto: CreateEntregaDTO) {
    const entrega = await this.entregaService.create(dto);

    return new ResponseDto(
      true,
      'Entrega creada con éxito',
      EntregaResponseMapper.toResponse(entrega),
    );
  }
}
