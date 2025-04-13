import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailQueue',
    }),
  ],
  providers: [TaskService],
})
export class TaskModule {}
