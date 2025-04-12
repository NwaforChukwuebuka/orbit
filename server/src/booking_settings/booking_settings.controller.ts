import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookingSettingsService } from './booking_settings.service';
import { BookingSettings } from './booking_settings.entity';

@Controller('booking-settings')
export class BookingSettingsController {
  constructor(private readonly bookingSettingsService: BookingSettingsService) {}

  @Get()
  findAll(): Promise<BookingSettings[]> {
    return this.bookingSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookingSettings> {
    return this.bookingSettingsService.findOne(id);
  }

  @Get('venue/:venueId')
  findByVenue(@Param('venueId') venueId: string): Promise<BookingSettings> {
    return this.bookingSettingsService.findByVenue(venueId);
  }

  @Post()
  create(@Body() bookingSettings: Partial<BookingSettings>): Promise<BookingSettings> {
    return this.bookingSettingsService.create(bookingSettings);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() bookingSettings: Partial<BookingSettings>,
  ): Promise<BookingSettings> {
    return this.bookingSettingsService.update(id, bookingSettings);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bookingSettingsService.remove(id);
  }
}
