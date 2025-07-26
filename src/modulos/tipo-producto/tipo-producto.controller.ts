import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTipoProductoDto } from './dto/create-tipoProducto.dto';
import { TipoProductoService } from './tipo-producto.service';

const urlTipoProducto = 'tipo-producto';

@Controller('tipo-producto')
export class TipoProductoController {
    constructor(private readonly tipoProductoService: TipoProductoService) {}

    @Get()
    async getTipoProductos() {
        return this.tipoProductoService.obtenerTodos();
    }

    @Post()
    async crearTipoProducto(@Body() createTipoProductoDto: CreateTipoProductoDto) {
        return this.tipoProductoService.crear(createTipoProductoDto.nombre);
    }
}
