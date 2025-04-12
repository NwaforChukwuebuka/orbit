import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';
import { RedisService } from 'src/common/utils/redis.service';
import { redisClientFactory } from 'src/common/utils/redis.client.factory';

@Module({
  providers: [
    UsersService,
    {
      provide: UserRepository,
      useFactory: (dataSource) => new UserRepository(dataSource),
      inject: [DataSource],
    },
    RedisService,
    redisClientFactory,
  ],
  controllers: [UsersController],
  exports: [RedisService, redisClientFactory],
})
export class UsersModule {}
