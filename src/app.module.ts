import { ConfigModule } from '@nestjs/config';
import { All, Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductoModule } from './modulos/producto/producto.module';
import configuration from './config/configuration';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ProductoModule,
    PrismaModule,
    // otros módulos
  ],
  providers: [PrismaService, AllExceptionsFilter],
})
export class AppModule {}
