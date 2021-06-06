import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { usersProviders } from './user.provides';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
