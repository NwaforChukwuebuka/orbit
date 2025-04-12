import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingSettings } from './booking_settings.entity';

@Injectable()
export class BookingSettingsService {
  constructor(
    @InjectRepository(BookingSettings)
    private bookingSettingsRepository: Repository<BookingSettings>,
  ) {}

  async findAll(): Promise<BookingSettings[]> {
    return this.bookingSettingsRepository.find();
  }

  async findOne(id: string): Promise<BookingSettings> {
    const bookingSettings = await this.bookingSettingsRepository.findOne({ where: { id } });
    if (!bookingSettings) {
      throw new NotFoundException(`Booking settings with ID ${id} not found`);
    }
    return bookingSettings;
  }

  async findByVenue(venueId: string): Promise<BookingSettings> {
    const bookingSettings = await this.bookingSettingsRepository.findOne({ 
      where: { venue: { id: venueId } },
      relations: ['venue']
    });
    if (!bookingSettings) {
      throw new NotFoundException(`Booking settings for venue with ID ${venueId} not found`);
    }
    return bookingSettings;
  }

  async create(bookingSettings: Partial<BookingSettings>): Promise<BookingSettings> {
    const newBookingSettings = this.bookingSettingsRepository.create(bookingSettings);
    return this.bookingSettingsRepository.save(newBookingSettings);
  }

  async update(id: string, bookingSettings: Partial<BookingSettings>): Promise<BookingSettings> {
    await this.bookingSettingsRepository.update(id, bookingSettings);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.bookingSettingsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Booking settings with ID ${id} not found`);
    }
  }
}
