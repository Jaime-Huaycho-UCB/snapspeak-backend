import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashService } from 'src/common/helpers/hash.helper';
import { UsersAuthService } from './services/users-auth.service';
import { UsersAuthController } from './controllers/users-auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController,UsersAuthController],
  providers: [UsersService,HashService,UsersAuthService],
  exports: [UsersService]
})
export class UsersModule {}
