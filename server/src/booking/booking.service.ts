import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  findOne(id: string): Promise<Booking | null> {
    return this.bookingRepository.findOne({ where: { id } });
  }

  async create(booking: Booking): Promise<Booking> {
    return this.bookingRepository.save(booking);
  }

  async update(id: string, booking: Booking): Promise<void> {
    await this.bookingRepository.update(id, booking);
  }

  async remove(id: string): Promise<void> {
    await this.bookingRepository.delete(id);
  }
} 