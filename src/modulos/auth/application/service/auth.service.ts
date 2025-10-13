import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthValidator } from '../validators/auth.validator';
import { LoginDto } from '../dtos/auth.dto';
import { UserEntity } from 'src/modulos/user/domain/entities/user-entity/user.entity';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly validatorService: AuthValidator,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<UserEntity> {
    return this.validatorService.validateUser(
      loginDto.email,
      loginDto.password,
    );
  }

  async login(user: UserEntity) {
    const payload = {
      id: user.getId(),
      nombre: user.getNombre(),
      apellido: user.getApellido(),
      email: user.getEmail(),
      rol: user.getRol(),
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwtSecret'),
      expiresIn: this.configService.get('jwtExpiresIn'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwtSecret'),
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
      user: { ...payload },
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('jwtSecret'),
      });
      const user = await this.validatorService.validateUser(payload.email);
      return this.login(user);
    } catch (e) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }
}
