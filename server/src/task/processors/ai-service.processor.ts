/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AiServiceService } from 'src/ai-service/ai-service.service';
import { AIAgentBookingRequest } from 'src/ai-service/types/types';

@Processor('aiBookingQueue')
export class AiBookingProcessor {
  constructor(private readonly aiService: AiServiceService) {}

  @Process('aiBooking')
  async handleAiBookingJob(job: Job) {
    console.log('Received job:', job.data);
    const { data } = job;
    console.log('Received data ai service booking job:', data);
    await this.aiService.aiAgentBookingCreation(data as AIAgentBookingRequest);
  }
}
