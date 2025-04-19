/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { UserStreakService } from 'src/user_streak/user_streak.service';
import { User } from 'src/users/user.entity';

@Processor('userStreakQueue')
export class UserStreakProcessor {
  constructor(private readonly userStreakService: UserStreakService) {}
  @Process('updateUserStreak')
  async handleUserStreak(job: Job) {
    console.log('received update UserStreak Task');
    const { data } = job;
    await this.userStreakService.updateUserStreak(data as User);
    console.log('User streak updated successfully');
  }
}
