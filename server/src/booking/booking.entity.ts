import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @Column()
  reference: string;

  @Column({ name: 'qr_code_url' })
  qrCodeUrl: string;

  @Column({ name: 'checked_in' })
  checkedIn: boolean;

  @Column({ name: 'is_expired' })
  isExpired: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'user' })
  userId: string;

  @ManyToOne(() => User, user => user.bookings)
  @JoinColumn({ name: 'user' })
  user: User;
} 