import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStreakService } from './user_streak.service';
import { UserStreakController } from './user_streak.controller';
import { UserStreak } from './user_streak.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserStreak])],
  controllers: [UserStreakController],
  providers: [UserStreakService],
  exports: [UserStreakService],
})
export class UserStreakModule {}
