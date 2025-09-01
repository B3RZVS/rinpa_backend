import { Module } from '@nestjs/common';
import { TipoProductoService } from './services/tipo-producto/tipo-producto.service';
import { TipoProductoController } from './controllers/tipo-producto/tipo-producto.controller';
import { TipoProductoDAO } from './repository/tipo-producto.dao';
import { PrismaService } from 'src/prisma/prisma.service';
import { TipoProductoValidator } from './validators/tipo-producto.validator';
import { UnidadDAO } from './repository/Unidad.dao';
import { UnidadService } from './services/unidad/unidad.service';
import { UnidadValidator } from './validators/unidad.validator';
import { UnidadController } from './controllers/unidad/Unidad.controller';
import { MedidaDAO } from './repository/medida.dao';
import { MedidaValidator } from './validators/medida.validator';
import { MedidaController } from './controllers/medida/medida.controller';
import { MedidaService } from './services/medida/medida.service';
import { ProductoService } from './services/producto/producto.service';
import { ProductoDAO } from './repository/producto.dao';
import { ProductoValidator } from './validators/producto.validator';
import { ProductoController } from './controllers/producto/producto.controller';

@Module({
  controllers: [
    TipoProductoController,
    UnidadController,
    MedidaController,
    ProductoController,
  ],
  providers: [
    PrismaService,

    // TipoProducto
    TipoProductoService,
    TipoProductoDAO,
    TipoProductoValidator,
    {
      provide: 'ITipoProductoDAO',
      useClass: TipoProductoDAO,
    },

    // Unidad
    UnidadService,
    UnidadDAO,
    UnidadValidator,
    {
      provide: 'UnidadIDAO',
      useClass: UnidadDAO,
    },
    //Medida
    MedidaService,
    MedidaDAO,
    MedidaValidator,
    {
      provide: 'MedidaIDAO',
      useClass: MedidaDAO,
    },
    //Producto
    ProductoService,
    ProductoDAO,
    ProductoValidator,
    {
      provide: 'ProductoIDAO',
      useClass: ProductoDAO,
    },
  ],
})
export class ProductoModule {}
