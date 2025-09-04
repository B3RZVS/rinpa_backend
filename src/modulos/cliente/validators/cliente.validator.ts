import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ClienteIDAO } from '../types/cliente.dao.interface';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ClienteMappers } from '../mappers/cliente.mapper';

@Injectable()
export class ClienteValidator {
  constructor(
    @Inject('ClienteIDAO') private readonly clienteDAO: ClienteIDAO,
  ) {}

  async ensureExistsById(id: number): Promise<void> {
    const exists = await this.clienteDAO.findById(id);
    if (!exists) {
      throw new ConflictException(`El cliente con ID '${id}' no existe.`);
    }
  }
  async ensureExistsByEmail(email: string): Promise<void> {
    const exists = await this.clienteDAO.findByEmail(email);

    if (exists) {
      const isDelete = exists.getIsDelete();
      if (!isDelete) {
        throw new ConflictException(`El cliente con email ${email} ya existe.`);
      } else {
        throw new ConflictException({
          message:
            'El cliente esta registrado pero se encuentra eliminado. ¿Desea restaurarlo?',
          data: ClienteMappers.toResponse(exists),
        });
      }
    }
  }
}
