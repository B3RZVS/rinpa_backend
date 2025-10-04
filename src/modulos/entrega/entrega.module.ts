import { Module } from '@nestjs/common';
import { PrecioNaftaController } from './controllers/precio-nafta.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrecioNaftaService } from './services/precio-nafta.service';
import { PrecioNaftaDAO } from './repository/precio-nafta.dao';
import { EntregaService } from './services/entrega.service';
import { EntregaDAO } from './repository/entrega.dao';
import { DetalleEntregaEntity } from './entities/detalleEntrega.entity';
import { DetalleEntregaDAO } from './repository/detalle-entrega.dao';
import { EntregaController } from './controllers/entrega.controller';
import { ClienteModule } from '../cliente/cliente.module';
import { UserModule } from '../user/user.module';
import { DetalleEntregaController } from './controllers/detalle-entrega.controller';
import { DetalleEntregaService } from './services/detalle-entrega.service';

@Module({
  imports: [ClienteModule, UserModule],
  controllers: [
    PrecioNaftaController,
    EntregaController,
    DetalleEntregaController,
  ],
  providers: [
    PrismaService,

    PrecioNaftaService,
    PrecioNaftaDAO,
    { provide: 'PrecioNaftaIDAO', useClass: PrecioNaftaDAO },

    EntregaService,
    EntregaDAO,
    { provide: 'EntregaIDAO', useClass: EntregaDAO },

    DetalleEntregaService,
    DetalleEntregaEntity,
    DetalleEntregaDAO,
    { provide: 'DetalleEntregaIDAO', useClass: DetalleEntregaDAO },
  ],
})
export class EntregaModule {}
