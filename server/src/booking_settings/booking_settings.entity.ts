import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venue } from '../venue/venue.entity';

@Entity('booking_settings')
export class BookingSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', name: 'visibilty_rules' })
  visibiltyRules: any;

  @Column({ name: 'lock_in_policy' })
  lockInPolicy: string;

  @Column({ name: 'allow_repeat' })
  allowRepeat: boolean;

  @Column({ name: 'allow_spot_swap' })
  allowSpotSwap: boolean;

  @ManyToOne(() => Venue)
  @JoinColumn({ name: 'venue' })
  venue: Venue;
} 