/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get('getUsersSize')
  async getUsersNumber() {
    const getUserCount = await this.activityService.getUserNumber();

    return {
      message: 'Users length fetch successfully',
      data: getUserCount,
      statusCode: 200,
    };
  }

  @Get('getOverallBookings')
  async getOverallBookings() {
    const getBookingsCount = await this.activityService.getTotalBookings();

    return {
      message: 'Overall total bookings fetch successfully',
      data: getBookingsCount,
      statusCode: 200,
    };
  }

  @Get('getDailyBookings')
  async getDailyBookings() {
    const getAllDailyBookings = await this.activityService.getDailyBookings();

    return {
      message: 'Daily Booking fetch successfully',
      data: getAllDailyBookings,
      statusCode: 200,
    };
  }

  @Get('getBusiestDay')
  async getBusiestDayOfWeek() {
    const data = await this.activityService.getBusyBookingDay();

    return {
      message: 'Busiest Booking day in a week fetch successfully',
      data,
      statusCode: 200,
    };
  }
}
