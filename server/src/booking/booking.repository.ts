import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Booking } from './booking.entity';

@Injectable()
export class BookingRepository extends Repository<Booking> {
  constructor(private dataSource: DataSource) {
    super(Booking, dataSource.createEntityManager());
  }
  async findActiveBookings(): Promise<Booking[]> {
    return this.find({ where: { isExpired: false } });
  }

  //   check if a spot is booked
  async isSpotBooked(spotId: string, date: Date): Promise<boolean> {
    const bookings = await this.find({
      where: {
        spot: { id: spotId },
        startDate: date,
        isExpired: false,
      },
    });

    return bookings.length > 0;
  }
}
