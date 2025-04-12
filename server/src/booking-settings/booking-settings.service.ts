import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingSettings } from './booking-settings.entity';

@Injectable()
export class BookingSettingsService {
  constructor(
    @InjectRepository(BookingSettings)
    private bookingSettingsRepository: Repository<BookingSettings>,
  ) {}

  findAll(): Promise<BookingSettings[]> {
    return this.bookingSettingsRepository.find();
  }

  findOne(id: string): Promise<BookingSettings | null> {
    return this.bookingSettingsRepository.findOne({ where: { id } });
  }

  findByVenue(venueId: string): Promise<BookingSettings | null> {
    return this.bookingSettingsRepository.findOne({ where: { venueId } });
  }

  async create(bookingSettings: BookingSettings): Promise<BookingSettings> {
    return this.bookingSettingsRepository.save(bookingSettings);
  }

  async update(id: string, bookingSettings: BookingSettings): Promise<void> {
    await this.bookingSettingsRepository.update(id, bookingSettings);
  }

  async remove(id: string): Promise<void> {
    await this.bookingSettingsRepository.delete(id);
  }
} 