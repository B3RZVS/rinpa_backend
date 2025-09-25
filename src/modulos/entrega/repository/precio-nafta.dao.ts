import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PrecioNaftaMapper } from '../mappers/mapper-dao/precio-nafta.mapper';
import { PrecioNaftaEntity } from '../entities/precioNafta.entity';
import { PrecioNaftaIDAO } from '../types/precio-nafta.dao.interface';
import { CreatePrecioNaftaDTO } from '../dtos/precioNafta/create-precio-nafta.dto';

@Injectable()
export class PrecioNaftaDAO implements PrecioNaftaIDAO {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PrecioNaftaEntity[]> {
    const PrecioNafta = await this.prisma.precioNafta.findMany();
    return PrecioNafta.map(PrecioNaftaMapper.toEntity);
  }

  async create(data: CreatePrecioNaftaDTO): Promise<PrecioNaftaEntity> {
    const created = await this.prisma.precioNafta.create({
      data: { ...data, fechaFin: null, fechaInicio: new Date() },
    });
    return PrecioNaftaMapper.toEntity(created);
  }
  async findByDateEndIsNull(): Promise<PrecioNaftaEntity | null> {
    const precioNafta = await this.prisma.precioNafta.findFirst({
      where: { fechaFin: null },
    });
    return precioNafta ? PrecioNaftaMapper.toEntity(precioNafta) : null;
  }

  async setDateEnd(data: PrecioNaftaEntity) {
    await this.prisma.precioNafta.update({
      where: { id: data.getId() },
      data: { fechaFin: new Date() },
    });
  }
}
