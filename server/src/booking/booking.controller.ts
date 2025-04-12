import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  findAll(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Booking | null> {
    return this.bookingService.findOne(id);
  }

  @Post()
  create(@Body() booking: Booking): Promise<Booking> {
    return this.bookingService.create(booking);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() booking: Booking): Promise<void> {
    return this.bookingService.update(id, booking);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bookingService.remove(id);
  }
} 