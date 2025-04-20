import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class TaskService {
  constructor(
    @InjectQueue('emailQueue') private emailQueue: Queue,
    @InjectQueue('firebaseQueue') private firebaseQueue: Queue,
    @InjectQueue('userStreakQueue') private userStreakQueue: Queue,
    @InjectQueue('aiBookingQueue') private aiBookingQueue: Queue,
  ) {}

  async sendMailTask(data: any) {
    await this.emailQueue.add('sendEmail', data);
  }

  async sendToFirebaseTask(data: any) {
    await this.firebaseQueue.add('sendToFirebase', data);
  }

  async updateUserStreakTask(data: any) {
    await this.userStreakQueue.add('updateUserStreak', data);
  }

  async aiBookingTask(data: any) {
    await this.aiBookingQueue.add('aiBooking', data);
  }
}
