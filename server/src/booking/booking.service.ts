/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpException, Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { CreateBookingDTO } from './dto/create-booking.dto';
import { UsersService } from 'src/users/users.service';
import { SpotService } from 'src/spot/spot.service';

@Injectable()
export class BookingService {
  // inject booking repo
  constructor(
    private bookingRepo: BookingRepository,
    private userService: UsersService,
    private spotService: SpotService,
  ) {}

  // create booking
  async createBooking(bookingPayload: CreateBookingDTO) {
    // get user and spot from payload
    const { user, spot } = bookingPayload;

    // gotta check if spot is available
    const isBooked = await this.bookingRepo.isSpotBooked(
      spot,
      bookingPayload.date,
    );
    if (isBooked) {
      throw new HttpException('Spot Booked by another user', 400);
    }
    const [fetchedSpot, fetchedUser] = await this.getSpotAndUser(spot, user);
    bookingPayload.user = fetchedUser;

    const bookedUser = {
      id: fetchedUser.id,
      email: fetchedUser.email,
      firstName: fetchedUser.firstName,
      lastName: fetchedUser.lastName,
      phoneNumber: fetchedUser.phoneNumber,
    };
    fetchedSpot.bookedUser = bookedUser;
    fetchedSpot.isAvailable = false;

    // save spot
    const savedSpot = await this.spotService.saveSpot(fetchedSpot);

    bookingPayload.spot = savedSpot;
    bookingPayload.startTime = new Date(bookingPayload.startTime);
    bookingPayload.endTime = new Date(bookingPayload.endTime);

    // TODO: Check booking settings for data before continuing to book
    // TODO: handle repeat bookings
    const booking = this.bookingRepo.create(bookingPayload);
    return await this.bookingRepo.save(booking);
  }

  async getSpotAndUser(spot, user): Promise<any> {
    return await Promise.all([
      this.spotService.findOne(spot),
      this.userService.getUserById(user),
    ]);
  }
}
