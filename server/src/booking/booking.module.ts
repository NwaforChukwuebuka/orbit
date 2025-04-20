import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { UsersModule } from 'src/users/users.module';
import { SpotModule } from 'src/spot/spot.module';
import { BookingRepository } from './booking.repository';
import { DataSource } from 'typeorm';

import { TaskModule } from 'src/task/task.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { UserStreakModule } from 'src/user_streak/user_streak.module';

@Module({
  imports: [
    UsersModule,
    SpotModule,
    TaskModule,
    FirebaseModule,
    UserStreakModule,
  ],
  providers: [
    BookingService,
    {
      provide: BookingRepository,
      useFactory: (dataSource) => new BookingRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [BookingController],
  exports: [BookingService, BookingRepository],
})
export class BookingModule {}
