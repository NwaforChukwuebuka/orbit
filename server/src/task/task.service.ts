import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class TaskService {
  constructor(
    @InjectQueue('emailQueue') private emailQueue: Queue,
    @InjectQueue('firebaseQueue') private firebaseQueue: Queue,
  ) {}

  async sendMailTask(data: any) {
    await this.emailQueue.add('sendEmail', data);
  }

  async sendToFirebaseTask(data: any) {
    await this.firebaseQueue.add('sendToFirebase', data);
  }
}
