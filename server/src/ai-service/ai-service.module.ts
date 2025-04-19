import { Module } from '@nestjs/common';
import { AiServiceService } from './ai-service.service';
import { AiServiceController } from './ai-service.controller';

@Module({
  providers: [AiServiceService],
  controllers: [AiServiceController],
})
export class AiServiceModule {}
