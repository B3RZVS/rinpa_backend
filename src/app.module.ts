import { ConfigModule } from '@nestjs/config';
import { All, Module } from '@nestjs/common';

//Modulos
import { PrismaModule } from './prisma/prisma.module';
import { ProductoModule } from './modulos/producto/producto.module';
import { UserModule } from './modulos/user/user.module';
//Service
import { PrismaService } from './prisma/prisma.service';
//Extras
import configuration from './config/configuration';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { AuthModule } from './modulos/auth/auth.module';
import { ClienteModule } from './modulos/cliente/cliente.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ProductoModule,
    PrismaModule,
    UserModule,
    AuthModule,
    ClienteModule,
    // otros módulos
  ],
  providers: [PrismaService, AllExceptionsFilter],
  controllers: [],
})
export class AppModule {}
