import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { EntregaService } from '../services/entrega.service';
import { EntregaResponseMapper } from '../mappers/mappers-response/entrega-responde.mapper';
import { CreateEntregaDTO } from '../dtos/entrega/create-entrega.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UpdateEntregaDTO } from '../dtos/entrega/update-entrega.dto';
import { QueryParamsDto } from 'src/common/pagination/queryParams.dto';
import { PaginatedResponseInterceptor } from 'src/common/pagination/interceptors/paginated-response.interceptor';
import { EntregaEntity } from '../entities/entrega.entity';

@Controller('entrega')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService) {}

  @Get()
  async getEntregas() {
    const entregas = await this.entregaService.getAll();
    return entregas.map((entrega) => {
      const cliente = entrega.getCliente();
      const usuario = entrega.getUsuario();
      const precioNafta = entrega.getPrecioNafta();

      return EntregaResponseMapper.toResponse(
        entrega,
        cliente || null,
        usuario || null,
        precioNafta?.getPrecio() || null,
      );
    });
  }
  @Get('paginated')
  @UseInterceptors(
    new PaginatedResponseInterceptor<EntregaEntity, any>(
      (entrega: EntregaEntity) => {
        const cliente = entrega.getCliente();
        const usuario = entrega.getUsuario();
        const precioNafta = entrega.getPrecioNafta();

        return EntregaResponseMapper.toResponse(
          entrega,
          cliente || null,
          usuario || null,
          precioNafta?.getPrecio() || null,
        );
      },
    ),
  )
  async getPaginatedEntregas(@Query() query: QueryParamsDto) {
    // Esto debe devolver: { data: EntregaEntity[], meta: {...} }
    return await this.entregaService.getAllPaginated(query);
  }

  @Get(':id')
  async getEntregaById(@Param('id') id: number) {
    const entrega = await this.entregaService.getById(id);
    const cliente = entrega.getCliente();
    const usuario = entrega.getUsuario();
    const precioNafta = entrega.getPrecioNafta();

    return EntregaResponseMapper.toResponse(
      entrega,
      cliente || null,
      usuario || null,
      precioNafta?.getPrecio() || null,
    );
  }

  @Post()
  async crearEntrega(@Body() dto: CreateEntregaDTO) {
    const entrega = await this.entregaService.create(dto);
    const cliente = entrega.getCliente();
    const usuario = entrega.getUsuario();
    const precioNafta = entrega.getPrecioNafta();

    return new ResponseDto(
      true,
      'Entrega creada con éxito',
      EntregaResponseMapper.toResponse(
        entrega,
        cliente || null,
        usuario || null,
        precioNafta?.getPrecio() || null,
      ),
    );
  }

  @Put(':id')
  async updateEntrega(@Param('id') id: number, @Body() dto: UpdateEntregaDTO) {
    const entrega = await this.entregaService.update(id, dto);
    const cliente = entrega.getCliente();
    const usuario = entrega.getUsuario();
    const precioNafta = entrega.getPrecioNafta();

    return new ResponseDto(
      true,
      'Entrega actualizada con Exito',
      EntregaResponseMapper.toResponse(
        entrega,
        cliente || null,
        usuario || null,
        precioNafta?.getPrecio() || null,
      ),
    );
  }

  @Delete(':id')
  async deleteEntrega(@Param('id') id: number) {
    await this.entregaService.delete(id);
    return new ResponseDto(true, 'Entrega eliminada con Exito');
  }

  @Post('generar-aleatorias')
  async generar() {
    await this.entregaService.generacionAutomaticaDeEntregas();
    return { message: `Se generaron entregas aleatorias` };
  }
}
