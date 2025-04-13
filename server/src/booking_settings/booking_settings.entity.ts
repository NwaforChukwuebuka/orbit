import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Venue } from '../venue/venue.entity';
import { LockInPolicy } from './types/lock-in-policy.enum';

@Entity('booking_settings')
export class BookingSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', name: 'visibilty_rules' })
  visibiltyRules: any;

  @Column({ name: 'lock_in_policy' })
  lockInPolicy: LockInPolicy;

  @Column({ name: 'allow_repeat' })
  allowRepeat: boolean;

  @Column({ name: 'allow_spot_swap' })
  allowSpotSwap: boolean;

  @OneToOne(() => Venue, (venue) => venue.bookingSettings, { cascade: true })
  @JoinColumn()
  venue: Venue;
}
