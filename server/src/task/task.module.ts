import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from 'src/email/email.module';
import { EmailProcessor } from './processors/email.processor';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseProcessor } from './processors/firebase.processor';
import { UserStreakProcessor } from './processors/updateUserStreak.processor';
import { UserStreakModule } from 'src/user_streak/user_streak.module';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'emailQueue',
      },
      {
        name: 'firebaseQueue',
      },
      {
        name: 'userStreakQueue',
      },
    ),

    EmailModule,
    FirebaseModule,
    UserStreakModule,
  ],
  providers: [
    TaskService,
    EmailProcessor,
    FirebaseProcessor,
    UserStreakProcessor,
  ],
  exports: [TaskService],
})
export class TaskModule {}
