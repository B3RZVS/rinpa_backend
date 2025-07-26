import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    
    whitelist:true //Linea para que elimine los atributos que no estan en el dto

  })) //Esto es para validar en toda la app con los dto

  app.enableCors(); //Habilita CORS para todas las rutas
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
