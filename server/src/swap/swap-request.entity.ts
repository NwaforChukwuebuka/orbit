import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from 'src/booking/booking.entity';
import { User } from 'src/users/user.entity';

export enum SwapRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

@Entity('swap_requests')
export class SwapRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(() => Booking, { eager: true })
  requestorBooking: Booking;
  
  @ManyToOne(() => Booking, { eager: true })
  requestedBooking: Booking;
  
  @ManyToOne(() => User)
  requestorUser: User;
  
  @ManyToOne(() => User)
  requestedUser: User;
  
  @Column({
    type: 'enum',
    enum: SwapRequestStatus,
    default: SwapRequestStatus.PENDING,
  })
  status: SwapRequestStatus;
  
  @Column({ nullable: true })
  message: string;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @Column({ nullable: true, type: 'timestamp' })
  resolvedAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
} 