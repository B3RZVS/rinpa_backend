import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrecioNaftaService } from '../services/precio-nafta.service';
import { PrecioNaftaResponseMapper } from '../mappers/mappers-response/precio-nafta-response.mapper';
import { CreatePrecioNaftaDTO } from '../dtos/precioNafta/create-precio-nafta.dto';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('precioNafta')
export class PrecioNaftaController {
  constructor(private readonly precioNaftaService: PrecioNaftaService) {}

  @Get()
  async getPrecioNafta() {
    const precioNafta = await this.precioNaftaService.getAll();
    return precioNafta.map(PrecioNaftaResponseMapper.toResponse);
  }

  @Post()
  async crearPrecioNafta(@Body() dto: CreatePrecioNaftaDTO) {
    const precioNafta = await this.precioNaftaService.create(dto);

    return new ResponseDto(
      true,
      'Precio nafta creada con éxito',
      PrecioNaftaResponseMapper.toResponse(precioNafta),
    );
  }
}
