import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venue } from '../venue/venue.entity';

@Entity('venue_rules')
export class VenueRules {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venue)
  @JoinColumn({ name: 'venue' })
  venue: Venue;
} 