import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venue } from '../venue/venue.entity';

@Entity('booking_settings')
export class BookingSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'visibilty_rules', type: 'jsonb' })
  visibilityRules: any;

  @Column({ name: 'lock_in_policy' })
  lockInPolicy: string;

  @Column({ name: 'allow_repeat' })
  allowRepeat: boolean;

  @Column({ name: 'allow_spot_swap' })
  allowSpotSwap: boolean;

  @Column({ name: 'venue' })
  venueId: string;

  @ManyToOne(() => Venue, venue => venue.bookingSettings)
  @JoinColumn({ name: 'venue' })
  venue: Venue;
} 