/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateBookingDTO } from './dto/create-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateBookingDTO } from './dto/update-booking.dto';

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

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async cancelBooking(@Param('id') id: string, @GetUser() user: any) {
    await this.bookService.cancelBooking(id, user.userId);
    return {
      message: 'Booking cancelled successfully',
      statusCode: 200,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateBooking(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDTO,
    @GetUser() user: any,
  ) {
    const data = await this.bookService.updateBooking(
      id,
      updateBookingDto,
      user.userId,
    );
    return {
      message: 'Booking updated successfully',
      data,
      statusCode: 200,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserBookings(@GetUser() user: any) {
    const bookings = await this.bookService.getUserBookings(user.userId);
    return {
      message: 'User bookings retrieved successfully',
      data: bookings,
      statusCode: 200,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getBookingById(@Param('id') id: string, @GetUser() user: any) {
    const booking = await this.bookService.getBookingById(id, user.userId);
    return {
      message: 'Booking retrieved successfully',
      data: booking,
      statusCode: 200,
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
