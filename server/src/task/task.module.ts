import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from 'src/email/email.module';
import { EmailProcessor } from './processors/email.processor';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseProcessor } from './processors/firebase.processor';
import { UserStreakProcessor } from './processors/updateUserStreak.processor';
import { UserStreakModule } from 'src/user_streak/user_streak.module';
import { AiBookingProcessor } from './processors/ai-service.processor';
import { AiServiceModule } from 'src/ai-service/ai-service.module';

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
      {
        name: 'aiBookingQueue',
      },
    ),

    EmailModule,
    FirebaseModule,
    UserStreakModule,
    AiServiceModule,
  ],
  providers: [
    TaskService,
    EmailProcessor,
    FirebaseProcessor,
    UserStreakProcessor,
    AiBookingProcessor,
  ],
  exports: [TaskService],
})
export class TaskModule {}
