import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PruebaModule } from './modulos/prueba/prueba.module';
import { TipoProductoModule } from './modulos/tipo-producto/tipo-producto.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PruebaModule,
    TipoProductoModule
    // otros módulos
  ],
})
export class AppModule {}