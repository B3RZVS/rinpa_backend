import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TipoProductoService {
  constructor(private prisma: PrismaService) {}

  async crear(nombre: string) {
    return this.prisma.tipoProducto.create({
      data: { nombre },
    });
  }

  async obtenerTodos() {
    return this.prisma.tipoProducto.findMany();
  }

  async eliminar(id: number) {
    return this.prisma.tipoProducto.delete({ where: { id } });
  }

  async modificar(id: number, nuevoNombre: string) {
    return this.prisma.tipoProducto.update({
      where: { id },
      data: { nombre: nuevoNombre },
    });
  }
}

