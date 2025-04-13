/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from 'src/email/email.service';

@Processor('emailQueue')
export class EmailProcessor {
  constructor(private readonly emailService: EmailService) {}
  @Process('sendEmail')
  async handleSendEmail(job: Job) {
    const { to, subject, text } = job.data;
    await this.emailService.sendEmail(to, subject, text);
    console.log(`Email sent to ${to}`);
  }
}
