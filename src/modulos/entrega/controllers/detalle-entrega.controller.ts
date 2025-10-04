import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { DetalleEntregaService } from '../services/detalle-entrega.service';
import { CreateDetalleEntregaDTO } from '../dtos/detalleEntrega/create-detalle-entrega.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { DetalleEntregaResponseMapper } from '../mappers/mappers-response/detalle-entrega.mapper';

@Controller('detalle-entrega')
export class DetalleEntregaController {
  constructor(private readonly detalleEntregaService: DetalleEntregaService) {}

  @Post(':id') //Id de la entrega
  async createDetalleEntrega(
    @Param('id') id: number,
    @Body() dto: CreateDetalleEntregaDTO,
  ) {
    await this.detalleEntregaService.create(dto, id);
    return new ResponseDto(true, 'Detalle agregado con exito');
  }

  @Put(':id')
  async updateDetalleEntrega(
    @Param('id') id: number,
    @Body() body: { cantidad: number },
  ) {
    const detalle = await this.detalleEntregaService.update(id, body.cantidad);
    return new ResponseDto(
      true,
      'Cantidad actualizada con exito',
      DetalleEntregaResponseMapper.toResponse(detalle),
    );
  }

  @Delete(':id')
  async deleteDetalleEntrega(@Param('id') id: number) {
    await this.detalleEntregaService.delete(id);
    return new ResponseDto(true, 'Detalle eliminado con exito');
  }
}
