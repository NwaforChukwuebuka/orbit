import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Venue } from '../venue/venue.entity';
import { Spot } from '../spot/spot.entity';

@Entity('work_station')
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

  @Column({ name: 'venue_id' })
  venueId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Venue, venue => venue.workStations)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @OneToMany(() => Spot, spot => spot.workStation)
  spots: Spot[];
} 