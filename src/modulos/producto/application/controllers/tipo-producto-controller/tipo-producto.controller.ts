import { Controller, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { TipoProductoService } from '../../service/tipo-producto-service/tipo-producto.service';
import { CreateTipoProductoDto } from '../../dtos/tipo-producto-dto/create-tipoProducto.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UpdateTipoProductoDto } from '../../dtos/tipo-producto-dto/update-tipoProducto.dto';
import { DeleteTipoProductoDto } from '../../dtos/tipo-producto-dto/delete-tipoProducto.dto';
import { TipoProductoViewMapper } from '../../mappersResponse/tipo-producto-mappers/tipo-producto-response.mapper';

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

  @Delete()
  async eliminarTipoProducto(@Body() dto: DeleteTipoProductoDto) {
    await this.tipoProductoService.delete(dto.id);
    return new ResponseDto(true, 'Eliminado con éxito');
  }
}
