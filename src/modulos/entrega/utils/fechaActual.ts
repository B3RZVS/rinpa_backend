import { CreateEntrega } from '../dtos/entrega/create-entrega.dto';

export const fechaEntregaActual = (dto: CreateEntrega) => {
  if (!dto.fecha) {
    return new Date(
      new Date().toLocaleString('en-US', {
        timeZone: 'America/Argentina/Buenos_Aires',
      }),
    );
  }
  const fechaFinal = new Date(
    dto.fecha.toLocaleString('en-US', {
      timeZone: 'America/Argentina/Buenos_Aires',
    }),
  );

  return fechaFinal;
};
