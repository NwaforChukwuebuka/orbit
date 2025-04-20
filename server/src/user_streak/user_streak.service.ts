import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStreak } from './user_streak.entity';
import { User } from 'src/users/user.entity';
import { isSameDay, isYesterday } from 'date-fns';

@Injectable()
export class UserStreakService {
  constructor(
    @InjectRepository(UserStreak)
    private userStreakRepository: Repository<UserStreak>,
  ) {}

  async updateUserStreak(user: User) {
    let streak = await this.userStreakRepository.findOne({
      where: { user: { id: user.id } },
    });
    const today = new Date();

    if (!streak) {
      streak = this.userStreakRepository.create({
        user,
        lastActivityDate: today,
        streakCount: 1,
        highestStreak: 1,
      });
    } else {
      if (isSameDay(streak.lastActivityDate, today)) {
        return streak; // No update needed if the last activity date is today
      }
      if (isYesterday(streak.lastActivityDate)) {
        streak.streakCount += 1; // Increment streak count if yesterday
      } else {
        // reset streak count if not consecutive
        streak.highestStreak = Math.max(
          streak.highestStreak,
          streak.streakCount,
        );
        streak.streakCount = 1; // Reset streak count if not consecutive
      }
      streak.lastActivityDate = today;
    }
    return await this.userStreakRepository.save(streak);
  }
}
