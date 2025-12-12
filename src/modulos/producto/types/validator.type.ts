export type ValidationResult =
  | { status: 'OK' }
  | { status: 'RESTORE'; id: number }
  | { status: 'CONFLICT'; message: string };
