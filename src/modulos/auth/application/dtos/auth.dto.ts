import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MinLength(1)
  email: string;
  @IsString()
  @MinLength(4)
  password: string;
}
