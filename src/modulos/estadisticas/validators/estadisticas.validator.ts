import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class EstadisticasValidator {
  async dateValidator(fechaInicio: Date, fechaFin: Date): Promise<void> {
    if (new Date(fechaInicio) >= new Date(fechaFin)) {
      throw new ConflictException(
        'La fecha inicio debe ser menor que la fecha fin',
      );
    }
  }
}
