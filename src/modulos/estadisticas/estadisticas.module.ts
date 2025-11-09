import { Module } from '@nestjs/common';
import { EstadisticasController } from './controllers/estadisticas.controller';
import { EstadisticasService } from './services/estadisticas.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EstadisticasRepository } from './repository/estadisticas.dao';
import { EstadisticasValidator } from './validators/estadisticas.validator';

@Module({
  controllers: [EstadisticasController],
  providers: [
    EstadisticasService,
    PrismaService,
    EstadisticasRepository,
    { provide: 'EstadisticasRepository', useClass: EstadisticasRepository },
    EstadisticasValidator,
  ],
})
export class EstadisticasModule {}
