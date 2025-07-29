import { Body, Controller, Get, Post } from '@nestjs/common';
import { UnidadService } from '../../service/unidad-service/unidad.service';
import { UnidadResponseMapper } from '../../mappersResponse/unidad-mapper-response/unidad-response.mapper';
import { GetUnidadDto } from '../../dtos/unidad-dto/get-unidad.dto';
import { CreateUnidadDto } from '../../dtos/unidad-dto/create-unidad.dto';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('unidad')
export class UnidadController {
  constructor(private readonly unidadService: UnidadService) {}

  @Get()
  async getUnidades(): Promise<GetUnidadDto[]> {
    const unidades = await this.unidadService.getAll();
    return unidades.map(UnidadResponseMapper.toResponse);
  }

  @Post()
  async createUnidad(@Body() dto: CreateUnidadDto) {
    const unidad = await this.unidadService.create(dto.nombre, dto.simbolo);
    return new ResponseDto(
      true,
      'Unidad creada exitosamente',
      UnidadResponseMapper.toResponse(unidad),
    );
  }
}
