import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { BookingService } from 'src/booking/booking.service';

@Injectable()
export class ActivityService {
  constructor(
    private userService: UsersService,
    private bookingService: BookingService,
  ) {}
  async getUserNumber() {
    const getUsers = await this.userService.getAllUsers();

    return getUsers.length;
  }

  async getTotalBookings() {
    const getBookings = await this.bookingService.getAllBooking();

    return getBookings.length;
  }

  async getDailyBookings() {
    const getBookings = await this.bookingService.getTodayBookings();

    return getBookings;
  }
  async getBusyBookingDay() {
    const getBusyBookings = await this.bookingService.getHighestBookingDay();

    return getBusyBookings;
  }
}
