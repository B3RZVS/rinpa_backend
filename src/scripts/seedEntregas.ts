import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { EntregaService } from 'src/modulos/entrega/services/entrega.service';
import { CreateEntregaDTO } from 'src/modulos/entrega/dtos/entrega/create-entrega.dto';
import { CreateDetalleEntregaDTO } from 'src/modulos/entrega/dtos/detalleEntrega/create-detalle-entrega.dto';
console.log('>>> Iniciando seed-entregas.ts');

async function bootstrap() {
  console.log('se creo');
  const app = await NestFactory.createApplicationContext(AppModule);
  console.log('pase');
  const entregaService = app.get(EntregaService);
  const clientes = [1, 2, 3, 4];
  const usuarioId = 1;
  const precioNaftaId = 3;
  const productos = [
    { id: 1, precio: 1450 },
    { id: 2, precio: 1550 },
    { id: 3, precio: 1950 },
    { id: 4, precio: 2430 },
    { id: 5, precio: 70 },
    { id: 6, precio: 730 },
    { id: 7, precio: 1050 },
    { id: 8, precio: 3100 },
  ];

  for (let i = 0; i < 4; i++) {
    const clienteId = randomItem(clientes);
    const fecha = randomDate(new Date(2025, 8, 1), new Date(2025, 10, 7)); // sept-nov
    const litrosGastados = randomNumber(2, 10);

    const numDetalles = randomNumber(1, 3);
    const detalles: CreateDetalleEntregaDTO[] = [];

    for (let j = 0; j < numDetalles; j++) {
      const prod = randomItem(productos);
      detalles.push({
        cantidad: randomNumber(1, 10),
        precioUnitario: prod.precio,
        productoId: prod.id,
      });
    }

    const data: CreateEntregaDTO = {
      clienteId,
      usuarioId,
      precioNaftaId,
      litrosGastados,
      fecha,
      detalles,
    };

    console.log(data);
    // await entregaService.create(data);
  }

  console.log('✅ Entregas generadas correctamente con el Service');
  await app.close();
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

bootstrap().catch((err) => {
  console.error(err);
});
