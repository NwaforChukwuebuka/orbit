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
    const bookings = await this.createQueryBuilder('bookings')
      .where('bookings.spotId = :spotId', { spotId })
      .andWhere('bookings.date = :date', { date })
      .andWhere('bookings.isExpired = false')
      .getMany();

    return bookings.length > 0;
  }
}
