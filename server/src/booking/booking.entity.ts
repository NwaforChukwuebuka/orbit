import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Spot } from 'src/spot/spot.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ name: 'qr_code_url', nullable: true })
  qrCodeUrl: string;

  @Column({ name: 'checked_in', default: false })
  checkedIn: boolean;

  @Column({ name: 'is_expired', default: false })
  isExpired: boolean;

  @ManyToOne(() => Spot, (spot) => spot.bookings)
  spot: Spot;

  @Column()
  date: Date;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @Column({ name: 'available_for_swap', default: false })
  availableForSwap: boolean;

  @Column({ name: 'swap_available_until', nullable: true, type: 'timestamp' })
  swapAvailableUntil: Date;

  @Column({ name: 'swap_count', default: 0 })
  swapCount: number;
}
