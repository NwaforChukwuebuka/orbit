import { forwardRef, Module } from '@nestjs/common';
import { AiServiceService } from './ai-service.service';
import { AiServiceController } from './ai-service.controller';
import { SpotModule } from 'src/spot/spot.module';

import { BookingModule } from 'src/booking/booking.module';

import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [
    SpotModule,
    forwardRef(() => BookingModule),
    forwardRef(() => TaskModule),
  ],
  providers: [AiServiceService],
  controllers: [AiServiceController],
  exports: [AiServiceService],
})
export class AiServiceModule {}
