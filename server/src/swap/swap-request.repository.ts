import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SwapRequest, SwapRequestStatus } from './swap-request.entity';

@Injectable()
export class SwapRequestRepository extends Repository<SwapRequest> {
  constructor(private dataSource: DataSource) {
    super(SwapRequest, dataSource.createEntityManager());
  }

  async findPendingSwapRequests(userId: string): Promise<SwapRequest[]> {
    return this.find({
      where: [
        { requestedUser: { id: userId }, status: SwapRequestStatus.PENDING },
        { requestorUser: { id: userId }, status: SwapRequestStatus.PENDING },
      ],
      relations: [
        'requestorBooking', 
        'requestedBooking', 
        'requestorUser', 
        'requestedUser',
        'requestorBooking.spot',
        'requestedBooking.spot',
        'requestorBooking.user',
        'requestedBooking.user'
      ],
    });
  }

  async findSwapRequestsByUserId(userId: string): Promise<SwapRequest[]> {
    return this.find({
      where: [
        { requestedUser: { id: userId } },
        { requestorUser: { id: userId } },
      ],
      relations: [
        'requestorBooking', 
        'requestedBooking', 
        'requestorUser', 
        'requestedUser',
        'requestorBooking.spot',
        'requestedBooking.spot',
        'requestorBooking.user',
        'requestedBooking.user'
      ],
      order: { createdAt: 'DESC' },
    });
  }

  async findActiveSwapRequestForBooking(bookingId: string): Promise<SwapRequest | null> {
    return this.findOne({
      where: [
        { requestorBooking: { id: bookingId }, status: SwapRequestStatus.PENDING },
        { requestedBooking: { id: bookingId }, status: SwapRequestStatus.PENDING },
      ],
      relations: [
        'requestorBooking', 
        'requestedBooking', 
        'requestorUser', 
        'requestedUser',
        'requestorBooking.spot',
        'requestedBooking.spot',
        'requestorBooking.user',
        'requestedBooking.user'
      ],
    });
  }

  async findSwapRequestById(id: string): Promise<SwapRequest | null> {
    return this.findOne({
      where: { id },
      relations: [
        'requestorBooking', 
        'requestedBooking', 
        'requestorUser', 
        'requestedUser',
        'requestorBooking.spot',
        'requestedBooking.spot',
        'requestorBooking.user',
        'requestedBooking.user'
      ],
    });
  }
} 