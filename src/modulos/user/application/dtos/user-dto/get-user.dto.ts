import { GetRolDto } from '../rol-dto/get-rol.dto';
export class GetUserDto {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: GetRolDto;
}
