import { Module } from '@nestjs/common';
import { PrecioNaftaController } from './controllers/precio-nafta.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrecioNaftaService } from './services/precio-nafta.service';
import { PrecioNaftaDAO } from './repository/precio-nafta.dao';

@Module({
  controllers: [PrecioNaftaController],
  providers: [
    PrismaService,

    PrecioNaftaService,
    PrecioNaftaDAO,
    { provide: 'PrecioNaftaIDAO', useClass: PrecioNaftaDAO },
  ],
})
export class EntregaModule {}
