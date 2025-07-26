import { Module } from '@nestjs/common';
import { TipoProductoService } from './tipo-producto.service';
import { TipoProductoController } from './tipo-producto.controller';

@Module({
  providers: [TipoProductoService],
  controllers: [TipoProductoController]
})
export class TipoProductoModule {}
