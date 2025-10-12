import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolDAO } from './infrastructure/persistence/rol-DAO/rol.dao';
import { UserDAO } from './infrastructure/persistence/user-DAO/user.dao';
import { RolService } from './application/services/rol-service/rol.service';
import { RolValidator } from './domain/validators/rol-validator/rol.validator';
import { RolController } from './application/controllers/rol-controller/rol.controller';
import { UserService } from './application/services/user-service/user.service';
import { UserValidator } from './domain/validators/user-validator/user.validator';
import { UserController } from './application/controllers/user-controller/user.controller';

@Module({
  controllers: [RolController, UserController],
  providers: [
    PrismaService,

    //ROL
    RolService,
    RolValidator,
    RolDAO,
    {
      provide: 'RolIDAO',
      useClass: RolDAO,
    },

    //USER
    UserService,
    UserValidator,
    UserDAO,

    { provide: 'UserIDAO', useClass: UserDAO },
  ],
  exports: [UserService],
})
export class UserModule {}
