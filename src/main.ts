import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Linea para que elimine los atributos que no estan en el dto
      transform: true, //Linea para que transforme los tipos de datos
    }),
  ); //Esto es para validar en toda la app con los dto

  app.enableCors({
    origin: [
      'https://rinpa.frontend.com',
      'http://localhost:3000',
      'http://localhost:5173',
    ], // frontends permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // si necesitas enviar cookies
  }); //Habilita CORS para todas las rutas

  app.useGlobalFilters(app.get(AllExceptionsFilter)); // Registra el filtro de excepciones globalmente

  await app.listen(8000, '0.0.0.0');
}
bootstrap();
