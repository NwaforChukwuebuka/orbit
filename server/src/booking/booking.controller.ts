import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateBookingDTO } from './dto/create-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';

@Controller('bookings')
export class BookingController {
  constructor(private bookService: BookingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async createBooking(
    @Body() createBookingDto: CreateBookingDTO,
    @GetUser() user: User,
  ) {
    console.log('user: ', user);
    createBookingDto.user = user.id;
    const data = await this.bookService.createBooking(createBookingDto);
    return {
      message: 'Booking created successfully',
      data,
      statusCode: 201,
    };
  }
}
