import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MedidaService } from '../../services/medida/medida.service';
import { MedidaResponseMapper } from '../../mappers/mappersResponse/medida/medida-response.mapper';
import { CreateMedidaDTO } from '../../dtos/medida/create-medida.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UpdateMedidaDTO } from '../../dtos/medida/update-medida.dto';
import { DeleteMedidaDTO } from '../../dtos/medida/delete-medida.dto';

@Controller('medida')
export class MedidaController {
  constructor(private readonly medidaService: MedidaService) {}

  @Get()
  async getMedidas() {
    const medidas = await this.medidaService.getAll();
    return medidas.map(MedidaResponseMapper.toResponse);
  }

  @Post()
  async crearMedida(@Body() dto: CreateMedidaDTO) {
    const medida = await this.medidaService.create(dto.cantidad, dto.unidadId);

    return new ResponseDto(
      true,
      'Medida creada con éxito',
      MedidaResponseMapper.toResponse(medida),
    );
  }
  @Put()
  async actualizarMedida(@Body() dto: UpdateMedidaDTO) {
    const medida = await this.medidaService.update(
      dto.id,
      dto.cantidad,
      dto.unidadId,
    );
    return new ResponseDto(
      true,
      'Medida modificada con éxito',
      MedidaResponseMapper.toResponse(medida),
    );
  }
  @Delete(':id')
  async eliminarMedida(@Param('id') id: string) {
    await this.medidaService.delete(Number(id));
    return new ResponseDto(true, 'Medida eliminada con éxito');
  }
}
