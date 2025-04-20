/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateBookingDTO } from './dto/create-booking.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookings')
export class BookingController {
  constructor(private bookService: BookingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async createBooking(
    @Body() createBookingDto: CreateBookingDTO,
    @GetUser() user: any,
  ) {
    createBookingDto.user = user.userId;
    const data = await this.bookService.createBooking(createBookingDto);
    return {
      message: 'Booking created successfully',
      data,
      statusCode: 201,
    };
  }

  @Get('')
  async getAllBooking() {
    const getAllBookings = await this.bookService.getAllBooking();
    return {
      message: 'Booking retrieved successfully',
      data: getAllBookings,
      statusCode: 200,
    };
  }
}
