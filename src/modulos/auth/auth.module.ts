import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './application/controllers/auth.controller';
import { AuthService } from './application/service/auth.service';
import { AuthValidator } from './application/validators/auth.validator';
import { UserDAO } from '../user/infrastructure/persistence/user-DAO/user.dao';
import { JwtStrategy } from './application/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: {
          expiresIn: configService.get<string>('jwtExpiresIn'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthValidator,
    { provide: 'UserIDAO', useClass: UserDAO },
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
