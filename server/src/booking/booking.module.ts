import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { UsersModule } from 'src/users/users.module';
import { SpotModule } from 'src/spot/spot.module';
import { BookingRepository } from './booking.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [UsersModule, SpotModule],
  providers: [
    BookingService,
    {
      provide: BookingRepository,
      useFactory: (dataSource) => new BookingRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [BookingController],
  exports: [BookingService],
})
export class BookingModule {}
