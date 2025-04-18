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

  @ManyToOne(() => Spot, (spot) => spot.booking)
  spot: Spot;

  @Column({ type: 'timestamp' })
  startDateTime: Date;

  @Column({ type: 'timestamp' })
  endDateTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;
}
