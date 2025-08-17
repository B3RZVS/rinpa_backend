import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { RolIDAO } from 'src/modulos/user/infrastructure/interface/rol.dao.interface';

@Injectable()
export class RolValidator {
  constructor(@Inject('RolIDAO') private readonly rolDAO: RolIDAO) {}

  /**
   * Verifica que el rol exista por ID
   */
  async ensureExistsById(id: number): Promise<void> {
    const exists = await this.rolDAO.findById(id);
    if (!exists) {
      throw new ConflictException(`El rol con ID '${id}' no existe.`);
    }
  }
}
