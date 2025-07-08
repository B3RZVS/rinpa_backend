import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    // otros módulos
  ],
})
export class AppModule {}