/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpException, Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { CreateBookingDTO } from './dto/create-booking.dto';
import { UsersService } from 'src/users/users.service';
import { SpotService } from 'src/spot/spot.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Booking } from './booking.entity';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class BookingService {
  // inject booking repo
  constructor(
    private bookingRepo: BookingRepository,
    private userService: UsersService,
    private spotService: SpotService,
    private firebaseService: FirebaseService,
    private taskService: TaskService,
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
    // if (isBooked) {
    //   throw new HttpException('Spot Booked by another user', 400);
    // }
    const [fetchedSpot, fetchedUser] = await this.getSpotAndUser(spot, user);
    bookingPayload.user = fetchedUser;

    const bookedUser = {
      id: fetchedUser.id,
      email: fetchedUser.email,
      firstName: fetchedUser.firstName,
      lastName: fetchedUser.lastName,
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
    const data = await this.bookingRepo.save(booking);
    // add to firebase database
    const firebaseData = this.buildFirebaseData(data);
    // send this to a queue
    await this.taskService.sendToFirebaseTask(firebaseData);
    // send email to the user
    const bookDate = new Date(data.date).toLocaleDateString();
    const from = new Date(data.startTime).toLocaleTimeString();
    const to = new Date(data.endTime).toLocaleTimeString();
    const emailData = {
      to: data.user.email,
      subject: 'Booking Confirmation',
      text: `Your booking has been confirmed for ${bookDate} from ${from} to ${to}`,
    };
    await this.taskService.sendMailTask(emailData);
    return data;
  }

  buildFirebaseData(data: Booking) {
    const firebaseData = {
      id: data.id,
      date: data.date,
      startTime: data.startTime.toLocaleTimeString(),
      endTime: data.endTime.toLocaleTimeString(),
      spot: {
        id: data.spot.id,
        isAvailable: data.spot.isAvailable,
        bookedUser: data.spot.bookedUser,
      },
      user: {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
      },
    };
    return firebaseData;
  }

  async getSpotAndUser(spot, user): Promise<any> {
    return await Promise.all([
      this.spotService.findOne(spot),
      this.userService.getUserById(user),
    ]);
  }
}
