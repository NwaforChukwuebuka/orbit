/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';
import { LoggerService } from 'src/common/utils/logger.service';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST'),
      port: this.configService.get('EMAIL_PORT'),
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: this.configService.get('EMAIL_USER'),
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.loggerService.log('Email sent successfully');
    } catch (error) {
      this.loggerService.error('Error sending email:', error);
    }
  }
}
