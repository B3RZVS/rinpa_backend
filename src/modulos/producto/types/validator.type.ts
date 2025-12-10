export type ProductoValidationResult =
  | { status: 'OK' }
  | { status: 'RESTORE'; productoId: number }
  | { status: 'CONFLICT'; message: string };
