import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { EntregaIDAO } from '../types/entrega.dao.interface';

@Injectable()
export class EntregaValidator {
  constructor(
    @Inject('EntregaIDAO') private readonly entregaDAO: EntregaIDAO,
  ) {}

  async ensureExistsById(id: number): Promise<void> {
    const exists = await this.entregaDAO.findById(id);
    if (!exists) {
      throw new ConflictException(`La entrega con ID '${id}' no existe.`);
    }
  }
}
