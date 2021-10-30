import { Module } from '@nestjs/common';
import { UsersController, UsersService } from './users';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class AuthModule {}
