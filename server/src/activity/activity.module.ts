import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { UsersModule } from 'src/users/users.module';
import { BookingModule } from 'src/booking/booking.module';

@Module({
  imports: [UsersModule, BookingModule],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
