export function getRangeUTC(fechaInicio: string, fechaFin: string) {
  const inicio = new Date(`${fechaInicio}T00:00:00.000Z`);
  const fin = new Date(`${fechaFin}T23:59:59.999Z`);
  return { inicio, fin };
}
