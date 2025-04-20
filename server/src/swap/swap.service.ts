import { HttpException, Injectable } from '@nestjs/common';
import { SwapRequestRepository } from './swap-request.repository';
import { BookingRepository } from 'src/booking/booking.repository';
import { UserRepository } from 'src/users/user.repository';
import { CreateSwapRequestDTO } from './dto/create-swap-request.dto';
import { MarkAvailableForSwapDTO } from './dto/mark-available-for-swap.dto';
import { RespondToSwapRequestDTO } from './dto/respond-to-swap-request.dto';
import { SwapRequest, SwapRequestStatus } from './swap-request.entity';
import { TaskService } from 'src/task/task.service';
import { SpotService } from 'src/spot/spot.service';
import { BookedUser } from 'src/spot/spot.entity';

@Injectable()
export class SwapService {
  private readonly MINUTES_BEFORE_BOOKING_CUTOFF = 15;
  private readonly MAX_SWAPS_PER_USER = 2;

  constructor(
    private swapRequestRepo: SwapRequestRepository,
    private bookingRepo: BookingRepository,
    private userRepo: UserRepository,
    private taskService: TaskService,
    private spotService: SpotService,
  ) {}

  async markBookingAsAvailableForSwap(
    dto: MarkAvailableForSwapDTO,
    userId: string,
  ): Promise<void> {
    const booking = await this.bookingRepo.findOne({
      where: { id: dto.bookingId, user: { id: userId } },
      relations: ['user', 'spot'],
    });

    if (!booking) {
      throw new HttpException('Booking not found or does not belong to user', 404);
    }

    // Check if booking is in the past
    if (new Date(booking.date) < new Date()) {
      throw new HttpException('Cannot mark past bookings for swap', 400);
    }

    // Check if booking is too close to start time
    const minutesUntilBooking = this.getMinutesUntilBooking(booking.startTime);
    if (minutesUntilBooking < this.MINUTES_BEFORE_BOOKING_CUTOFF) {
      throw new HttpException(
        `Cannot mark for swap within ${this.MINUTES_BEFORE_BOOKING_CUTOFF} minutes of booking start time`,
        400,
      );
    }

    booking.availableForSwap = dto.availableForSwap;
    
    // Set swapAvailableUntil to 15 minutes before booking starts
    const swapCutoffTime = new Date(booking.startTime);
    swapCutoffTime.setMinutes(swapCutoffTime.getMinutes() - this.MINUTES_BEFORE_BOOKING_CUTOFF);
    booking.swapAvailableUntil = swapCutoffTime;

    await this.bookingRepo.save(booking);
  }

  async getAvailableSwaps(userId: string, date?: string): Promise<any[]> {
    // Get all swappable bookings that don't belong to the current user
    // and are marked as available for swap
    const query = this.bookingRepo
      .createQueryBuilder('booking')
      .innerJoinAndSelect('booking.user', 'user')
      .innerJoinAndSelect('booking.spot', 'spot')
      .where('booking.availableForSwap = :availableForSwap', { availableForSwap: true })
      .andWhere('user.id != :userId', { userId })
      .andWhere('booking.swapAvailableUntil > :now', { now: new Date() });

    // Filter by date if provided
    if (date) {
      query.andWhere('booking.date = :date', { date: new Date(date) });
    }

    const availableBookings = await query.getMany();

    // Format the response
    return availableBookings.map(booking => ({
      id: booking.id,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      spot: {
        id: booking.spot.id,
      },
      user: {
        id: booking.user.id,
        firstName: booking.user.firstName,
        lastName: booking.user.lastName,
      },
    }));
  }

  async createSwapRequest(
    dto: CreateSwapRequestDTO,
    userId: string,
  ): Promise<SwapRequest> {
    // Get the requestor's booking
    const requestorBooking = await this.bookingRepo.findOne({
      where: { id: dto.requestorBookingId, user: { id: userId } },
      relations: ['user', 'spot'],
    });

    if (!requestorBooking) {
      throw new HttpException('Requestor booking not found or does not belong to user', 404);
    }

    // Get the requested booking
    const requestedBooking = await this.bookingRepo.findOne({
      where: { id: dto.requestedBookingId, availableForSwap: true },
      relations: ['user', 'spot'],
    });

    if (!requestedBooking) {
      throw new HttpException('Requested booking not found or not available for swap', 404);
    }

    // Verify that both bookings are for the same date
    if (requestorBooking.date.toDateString() !== requestedBooking.date.toDateString()) {
      throw new HttpException('Swap requests are only allowed for the same date', 400);
    }

    // Check if the bookings are too close to start time
    const minutesUntilBooking = Math.min(
      this.getMinutesUntilBooking(requestorBooking.startTime),
      this.getMinutesUntilBooking(requestedBooking.startTime),
    );

    if (minutesUntilBooking < this.MINUTES_BEFORE_BOOKING_CUTOFF) {
      throw new HttpException(
        `Cannot request swaps within ${this.MINUTES_BEFORE_BOOKING_CUTOFF} minutes of booking start time`,
        400,
      );
    }

    // Check if user has reached the swap limit for the week
    const userBookings = await this.bookingRepo.find({
      where: { user: { id: userId } },
    });

    const weeklySwapCount = userBookings.reduce((count, booking) => count + booking.swapCount, 0);

    if (weeklySwapCount >= this.MAX_SWAPS_PER_USER) {
      throw new HttpException(`Maximum of ${this.MAX_SWAPS_PER_USER} swaps allowed per week`, 400);
    }

    // Check if there are existing active swap requests for either booking
    const existingSwapRequest = await this.swapRequestRepo.findActiveSwapRequestForBooking(
      requestorBooking.id,
    );

    if (existingSwapRequest) {
      throw new HttpException('There is already an active swap request for your booking', 400);
    }

    const existingRequestedSwapRequest = await this.swapRequestRepo.findActiveSwapRequestForBooking(
      requestedBooking.id,
    );

    if (existingRequestedSwapRequest) {
      throw new HttpException('There is already an active swap request for the requested booking', 400);
    }

    // Create swap request
    const swapRequest = this.swapRequestRepo.create({
      requestorBooking,
      requestedBooking,
      requestorUser: requestorBooking.user,
      requestedUser: requestedBooking.user,
      message: dto.message,
      status: SwapRequestStatus.PENDING,
    });

    const savedSwapRequest = await this.swapRequestRepo.save(swapRequest);

    // Send notification to the requested user
    const emailData = {
      to: requestedBooking.user.email,
      subject: 'New Swap Request',
      text: `You have received a new swap request from ${requestorBooking.user.firstName} ${requestorBooking.user.lastName} for your booking on ${new Date(requestedBooking.date).toLocaleDateString()} from ${new Date(requestedBooking.startTime).toLocaleTimeString()} to ${new Date(requestedBooking.endTime).toLocaleTimeString()}.`,
    };

    await this.taskService.sendMailTask(emailData);

    return savedSwapRequest;
  }

  async respondToSwapRequest(
    dto: RespondToSwapRequestDTO,
    userId: string,
  ): Promise<SwapRequest> {
    const swapRequest = await this.swapRequestRepo.findSwapRequestById(dto.swapRequestId);

    if (!swapRequest) {
      throw new HttpException('Swap request not found', 404);
    }

    // Check if requestedUser exists
    if (!swapRequest.requestedUser) {
      throw new HttpException('Requested user not found for this swap request', 404);
    }

    // Check if user is the requested user
    if (swapRequest.requestedUser.id !== userId) {
      throw new HttpException('You are not authorized to respond to this swap request', 403);
    }

    // Check if the request is still pending
    if (swapRequest.status !== SwapRequestStatus.PENDING) {
      throw new HttpException('This swap request is no longer pending', 400);
    }

    // Check if the bookings are too close to start time
    const minutesUntilBooking = Math.min(
      this.getMinutesUntilBooking(swapRequest.requestorBooking.startTime),
      this.getMinutesUntilBooking(swapRequest.requestedBooking.startTime),
    );

    if (minutesUntilBooking < this.MINUTES_BEFORE_BOOKING_CUTOFF) {
      throw new HttpException(
        `Cannot respond to swaps within ${this.MINUTES_BEFORE_BOOKING_CUTOFF} minutes of booking start time`,
        400,
      );
    }

    // Update swap request status
    swapRequest.status = dto.status;
    swapRequest.resolvedAt = new Date();
    
    if (dto.message) {
      swapRequest.message = dto.message;
    }

    const updatedSwapRequest = await this.swapRequestRepo.save(swapRequest);

    // If accepted, perform the swap
    if (dto.status === SwapRequestStatus.ACCEPTED) {
      // Reload both bookings with full relations before executing the swap
      const requestorBooking = await this.bookingRepo.findOne({
        where: { id: swapRequest.requestorBooking.id },
        relations: ['user', 'spot'],
      });
      
      const requestedBooking = await this.bookingRepo.findOne({
        where: { id: swapRequest.requestedBooking.id },
        relations: ['user', 'spot'],
      });

      if (!requestorBooking || !requestedBooking) {
        throw new HttpException('One or both bookings not found', 404);
      }

      // Ensure bookings have spots and users
      if (!requestorBooking.spot || !requestedBooking.spot || !requestorBooking.user || !requestedBooking.user) {
        throw new HttpException('Bookings are missing required spot or user information', 400);
      }

      // Update the bookings in the swap request
      updatedSwapRequest.requestorBooking = requestorBooking;
      updatedSwapRequest.requestedBooking = requestedBooking;
      
      await this.executeSwap(updatedSwapRequest);
    }

    // Send notification to the requestor
    const statusText = dto.status === SwapRequestStatus.ACCEPTED ? 'accepted' : 
                       dto.status === SwapRequestStatus.REJECTED ? 'rejected' : 
                       'cancelled';
    
    const emailData = {
      to: swapRequest.requestorUser.email,
      subject: `Swap Request ${statusText.charAt(0).toUpperCase() + statusText.slice(1)}`,
      text: `Your swap request for the booking on ${new Date(swapRequest.requestedBooking.date).toLocaleDateString()} has been ${statusText}.`,
    };

    await this.taskService.sendMailTask(emailData);

    return updatedSwapRequest;
  }

  async getUserSwapHistory(userId: string): Promise<SwapRequest[]> {
    return this.swapRequestRepo.findSwapRequestsByUserId(userId);
  }

  async getPendingSwapRequests(userId: string): Promise<SwapRequest[]> {
    return this.swapRequestRepo.findPendingSwapRequests(userId);
  }

  private async executeSwap(swapRequest: SwapRequest): Promise<void> {
    const { requestorBooking, requestedBooking } = swapRequest;

    // Check if both bookings have spots assigned
    if (!requestorBooking?.spot || !requestedBooking?.spot) {
      throw new HttpException('Cannot execute swap: one or both bookings are missing spot information', 400);
    }

    // Swap the spots
    const tempSpot = requestorBooking.spot;
    requestorBooking.spot = requestedBooking.spot;
    requestedBooking.spot = tempSpot;

    // Update the spots' booked users
    const requestorSpot = await this.spotService.findOne(requestorBooking.spot.id);
    const requestedSpot = await this.spotService.findOne(requestedBooking.spot.id);

    // Check if spots were found
    if (!requestorSpot || !requestedSpot) {
      throw new HttpException('Cannot execute swap: one or both spots not found', 404);
    }

    // Check if both bookings have users assigned
    if (!requestedBooking?.user || !requestorBooking?.user) {
      throw new HttpException('Cannot execute swap: one or both bookings are missing user information', 400);
    }

    const requestorUserInfo: BookedUser = {
      userId: requestedBooking.user.id,
      bookingTime: new Date().toISOString(),
    };

    const requestedUserInfo: BookedUser = {
      userId: requestorBooking.user.id,
      bookingTime: new Date().toISOString(),
    };

    requestorSpot.bookedUser = requestorUserInfo;
    requestedSpot.bookedUser = requestedUserInfo;

    // Mark bookings as no longer available for swap
    requestorBooking.availableForSwap = false;
    requestedBooking.availableForSwap = false;

    // Increment swap count
    requestorBooking.swapCount += 1;
    requestedBooking.swapCount += 1;

    // Save the updated bookings
    await this.bookingRepo.save([requestorBooking, requestedBooking]);
    await this.spotService.saveSpot(requestorSpot);
    await this.spotService.saveSpot(requestedSpot);
  }

  private getMinutesUntilBooking(bookingTime: Date): number {
    const now = new Date();
    const bookingDate = new Date(bookingTime);
    const diffMs = bookingDate.getTime() - now.getTime();
    return Math.floor(diffMs / 60000); // Convert milliseconds to minutes
  }
} 