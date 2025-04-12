import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';

@Module({
  providers: [
    UsersService,
    {
      provide: UserRepository,
      useFactory: (dataSource) => new UserRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
