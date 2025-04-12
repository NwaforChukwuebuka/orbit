import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BookingSettingsService } from './booking-settings.service';
import { BookingSettings } from './booking-settings.entity';

@Controller('booking-settings')
export class BookingSettingsController {
  constructor(private readonly bookingSettingsService: BookingSettingsService) {}

  @Get()
  findAll(): Promise<BookingSettings[]> {
    return this.bookingSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookingSettings | null> {
    return this.bookingSettingsService.findOne(id);
  }

  @Get('venue/:venueId')
  findByVenue(@Param('venueId') venueId: string): Promise<BookingSettings | null> {
    return this.bookingSettingsService.findByVenue(venueId);
  }

  @Post()
  create(@Body() bookingSettings: BookingSettings): Promise<BookingSettings> {
    return this.bookingSettingsService.create(bookingSettings);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() bookingSettings: BookingSettings): Promise<void> {
    return this.bookingSettingsService.update(id, bookingSettings);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bookingSettingsService.remove(id);
  }
} 