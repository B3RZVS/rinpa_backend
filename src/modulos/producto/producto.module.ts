import { Module } from '@nestjs/common';
import { TipoProductoService } from '../producto/application/service/tipo-producto-service/tipo-producto.service';
import { TipoProductoController } from '../producto/application/controllers/tipo-producto-controller/tipo-producto.controller';
import { TipoProductoDAO } from '../producto/infrastructure/persistence/tipo-producto-DAO/tipo-producto.dao';
import { PrismaService } from 'src/prisma/prisma.service';
import { TipoProductoValidator } from '../producto/domain/validators/tipo-producto-validator/tipo-producto.validator';
import { UnidadDAO } from './infrastructure/persistence/unidad-DAO/Unidad.dao';
import { UnidadService } from './application/service/unidad-service/unidad.service';
import { UnidadValidator } from './domain/validators/unidad-validator/unidad.validator';
import { UnidadController } from './application/controllers/unidad-controller/Unidad.controller';
import { MedidaDAO } from './infrastructure/persistence/medida-DAO/medida.dao';
import { MedidaValidator } from './domain/validators/medida-validator/medida.validator';
import { MedidaController } from './application/controllers/medida-controller/medida.controller';
import { MedidaService } from './application/service/medida-service/medida.service';

@Module({
  controllers: [TipoProductoController, UnidadController, MedidaController],
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
  ],
})
export class ProductoModule {}
