import { Module } from '@nestjs/common';
import { SwapService } from './swap.service';
import { SwapController } from './swap.controller';
import { SwapRequestRepository } from './swap-request.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwapRequest } from './swap-request.entity';
import { BookingModule } from 'src/booking/booking.module';
import { TaskModule } from 'src/task/task.module';
import { UsersModule } from 'src/users/users.module';
import { SpotModule } from 'src/spot/spot.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SwapRequest]),
    BookingModule,
    TaskModule,
    UsersModule,
    SpotModule,
  ],
  providers: [SwapService, SwapRequestRepository],
  controllers: [SwapController],
  exports: [SwapService],
})
export class SwapModule {} 