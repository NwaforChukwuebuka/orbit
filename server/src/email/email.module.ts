import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { LoggerService } from 'src/common/utils/logger.service';

@Module({
  imports: [],
  providers: [EmailService, LoggerService],
  exports: [EmailService],
})
export class EmailModule {}
