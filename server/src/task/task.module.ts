import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from 'src/email/email.module';
import { EmailProcessor } from './processors/email.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailQueue',
    }),
    EmailModule,
  ],
  providers: [TaskService, EmailProcessor],
  exports: [TaskService],
})
export class TaskModule {}
