import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { WorkStation } from '../work-station/work-station.entity';
import { BookingSettings } from '../booking-settings/booking-settings.entity';

@Entity('venue')
export class Venue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subdomain: string;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column({ name: 'brand_color' })
  brandColor: string;

  @Column({ name: 'contact_email' })
  contactEmail: string;

  @Column()
  website: string;

  @Column({ name: 'contact_phone' })
  contactPhone: string;

  @Column({ name: 'street_address' })
  streetAddress: string;

  @Column()
  city: string;

  @Column({ name: 'zip_code' })
  zipCode: number;

  @Column({ name: 'business_num' })
  businessNum: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'updated_at' })
  updatedAt: string;

  @OneToMany(() => User, user => user.venue)
  users: User[];

  @OneToMany(() => WorkStation, workStation => workStation.venue)
  workStations: WorkStation[];

  @OneToMany(() => BookingSettings, bookingSettings => bookingSettings.venue)
  bookingSettings: BookingSettings[];
} 