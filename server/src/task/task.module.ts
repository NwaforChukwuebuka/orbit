import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from 'src/email/email.module';
import { EmailProcessor } from './processors/email.processor';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseProcessor } from './processors/firebase.processor';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'emailQueue',
      },
      {
        name: 'firebaseQueue',
      },
    ),

    EmailModule,
    FirebaseModule,
  ],
  providers: [TaskService, EmailProcessor, FirebaseProcessor],
  exports: [TaskService],
})
export class TaskModule {}
