import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserIDAO } from 'src/modulos/user/infrastructure/interface/user.dao.interface';

@Injectable()
export class UserValidator {
  constructor(@Inject('UserIDAO') private readonly userDAO: UserIDAO) {}

  /**
   * Verifica que la Medida exista por ID
   */
  async ensureExistsById(id: number): Promise<void> {
    const exists = await this.userDAO.findById(id);
    if (!exists) {
      throw new ConflictException(`El usuario con ID '${id}' no existe.`);
    }
  }

  /**
   * Verifica que no exista otro usuario con el mismo mail
   */
  async ensureMailIsUnique(mail: string, id?: number): Promise<void> {
    const exists = await this.userDAO.findByEmail(mail);
    if (exists && exists.getId() !== id) {
      throw new ConflictException(`El usuario con ese mail ya existe.`);
    }
  }
}
