import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PruebaModule } from './modulos/prueba/prueba.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { TipoProductoModule } from './modulos/tipo-producto/tipo-producto.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PruebaModule,
    TipoProductoModule,
    PrismaModule
    // otros módulos
  ],
  providers: [PrismaService],
})
export class AppModule {}