import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { MedidaService } from '../../service/medida-service/medida.service';
import { MedidaResponseMapper } from '../../mappersResponse/medida-mapper-response/medida-response.mapper';
import { CreateMedidaDTO } from '../../dtos/medida-dto/create-medida.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UpdateMedidaDTO } from '../../dtos/medida-dto/update-medida.dto';
import { DeleteMedidaDTO } from '../../dtos/medida-dto/delete-medida.dto';

@Controller('medida')
export class MedidaController {
  constructor(private readonly medidaSerivice: MedidaService) {}

  @Get()
  async getMedidas() {
    const medidas = await this.medidaSerivice.getAll();
    return medidas.map(MedidaResponseMapper.toResponse);
  }

  @Post()
  async crearMedida(@Body() dto: CreateMedidaDTO) {
    const medida = await this.medidaSerivice.create(dto.cantidad, dto.unidadId);

    return new ResponseDto(
      true,
      'Medida creada con éxito',
      MedidaResponseMapper.toResponse(medida),
    );
  }
  @Put()
  async actualizarMedida(@Body() dto: UpdateMedidaDTO) {
    const medida = await this.medidaSerivice.update(
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
  @Delete()
  async eliminarMedida(@Body() dto: DeleteMedidaDTO) {
    await this.medidaSerivice.delete(dto.id);
    return new ResponseDto(true, 'Medida eliminada con éxito');
  }
}
