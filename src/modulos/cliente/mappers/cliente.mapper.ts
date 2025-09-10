import { ResponseClienteDto } from '../dtos/ResponseCliente.dto';
import { ClienteEntity } from '../entities/cliente.entity';
import type { Cliente as ClientePrisma } from '@prisma/client';

export class ClienteMappers {
  static toEntity(model: ClientePrisma): ClienteEntity {
    return new ClienteEntity(
      model.id,
      model.nombre,
      model.apellido,
      model.telefono,
      model.email,
      model.descripcion,
      model.direccion,
      model.isDeleted,
    );
  }

  static toResponse(model: ClienteEntity): ResponseClienteDto {
    const data = {
      id: model.getId(),
      nombre: model.getNombre(),
      apellido: model.getApellido(),
      telefono: model.getTelefono(),
      email: model.getEmail(),
      descripcion: model.getDescripcion(),
      direccion: model.getDireccion(),
    };
    return data;
  }
}
