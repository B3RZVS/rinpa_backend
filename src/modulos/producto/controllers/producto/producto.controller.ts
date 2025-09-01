import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductoService } from '../../services/producto/producto.service';
import { ProductoResponseMapper } from '../../mappers/mappersResponse/producto/producto-response.mapper';
import { CreateProductoDTO } from '../../dtos/producto/create-producto.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UpdateProductoDTO } from '../../dtos/producto/update-producto.dto';
import { DeleteProductoDTO } from '../../dtos/producto/delete-producto.dto';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  async getProductos() {
    const productos = await this.productoService.getAll();
    return productos.map(ProductoResponseMapper.toResponse);
  }
  @Post()
  async create(@Body() dto: CreateProductoDTO) {
    const productoCreado = await this.productoService.create(
      dto.precio,
      dto.descripcion,
      dto.tipoProductoId,
      dto.medidaId,
    );

    return new ResponseDto(
      true,
      'Producto creado con exito',
      ProductoResponseMapper.toResponse(productoCreado),
    );
  }

  @Put()
  async actualizarProducto(@Body() dto: UpdateProductoDTO) {
    const producto = await this.productoService.update(
      dto.id,
      dto.precio,
      dto.descripcion,
    );
    return new ResponseDto(
      true,
      'Producto modificada con éxito',
      ProductoResponseMapper.toResponse(producto),
    );
  }

  @Delete(':id')
  async eliminarProducto(@Param('id') id: string) {
    await this.productoService.delete(Number(id));
    return new ResponseDto(true, 'Producto eliminada con éxito');
  }
}
