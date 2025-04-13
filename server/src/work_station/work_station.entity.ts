import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venue } from '../venue/venue.entity';

@Entity('work_stations')
export class WorkStation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'street_address' })
  streetAddress: string;

  @Column()
  city: string;

  @Column({ name: 'zip_code' })
  zipCode: number;

  @ManyToOne(() => Venue)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @Column({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'date' })
  updatedAt: Date;
} 