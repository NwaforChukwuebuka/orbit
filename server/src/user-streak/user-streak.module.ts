import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStreak } from './user-streak.entity';
import { UserStreakService } from './user-streak.service';
import { UserStreakController } from './user-streak.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserStreak])],
  providers: [UserStreakService],
  controllers: [UserStreakController],
  exports: [UserStreakService],
})
export class UserStreakModule {} 