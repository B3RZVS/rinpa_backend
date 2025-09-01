import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { TipoProductoService } from '../../services/tipo-producto/tipo-producto.service';
import { CreateTipoProductoDto } from '../../dtos/tipo-producto/create-tipoProducto.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UpdateTipoProductoDto } from '../../dtos/tipo-producto/update-tipoProducto.dto';
import { DeleteTipoProductoDto } from '../../dtos/tipo-producto/delete-tipoProducto.dto';
import { TipoProductoViewMapper } from '../../mappers/mappersResponse/tipo/tipo-producto-response.mapper';

@Controller('tipo-producto')
export class TipoProductoController {
  constructor(private readonly tipoProductoService: TipoProductoService) {}

  @Get()
  async getTipoProductos() {
    const tipoProductos = await this.tipoProductoService.getAll();
    return tipoProductos.map(TipoProductoViewMapper.toResponse);
  }

  @Post()
  async crearTipoProducto(@Body() dto: CreateTipoProductoDto) {
    const result = await this.tipoProductoService.create(dto.nombre);
    return new ResponseDto(
      true,
      'Creado con éxito',
      TipoProductoViewMapper.toResponse(result),
    );
  }

  @Put()
  async editarTipoProducto(@Body() dto: UpdateTipoProductoDto) {
    const result = await this.tipoProductoService.update(dto.id, dto.nombre);
    return new ResponseDto(
      true,
      'Modificado con éxito',
      TipoProductoViewMapper.toResponse(result),
    );
  }

  @Delete(':id')
  async eliminarTipoProducto(@Param('id') id: string) {
    await this.tipoProductoService.delete(Number(id));
    return new ResponseDto(true, 'Eliminado con éxito');
  }
}
