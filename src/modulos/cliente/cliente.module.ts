import { Module } from '@nestjs/common';
import { ClienteService } from './services/cliente.service';
import { ClienteController } from './controllers/cliente/cliente.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClienteDAO } from './repository/cliente.dao';
import { ClienteValidator } from './validators/cliente.validator';

@Module({
  controllers: [ClienteController],
  providers: [
    PrismaService,

    //CLIENTE
    ClienteService,
    ClienteDAO,
    ClienteValidator,
    {
      provide: 'ClienteIDAO',
      useClass: ClienteDAO,
    },
  ],
  exports: [ClienteService, ClienteValidator],
})
export class ClienteModule {}
