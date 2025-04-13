import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { BookingSettings } from 'src/booking_settings/booking_settings.entity';

@Entity('venues')
export class Venue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  subdomain: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  brandColor: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column({ nullable: true })
  streetAddress: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  zipCode: number;

  @Column({ nullable: true })
  businessNum: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.venue)
  users: User[];

  @OneToMany(
    () => HoursOfAvailability,
    (hoursOfAvailability) => hoursOfAvailability.venue,
  )
  hoursOfAvailability: HoursOfAvailability[];

  @OneToOne(
    () => BookingSettings,
    (bookingSettings) => bookingSettings.venue,
    {},
  )
  bookingSettings: BookingSettings;
}

@Entity('hours_of_availability')
export class HoursOfAvailability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { array: true })
  workStationsIDs: string[];

  @Column('text', { nullable: true, array: true })
  daysOfWeek: string[];

  @Column({ nullable: false })
  startTime: string;

  @Column({ nullable: false })
  endTime: string;

  @ManyToOne(() => Venue, (venue) => venue.hoursOfAvailability)
  venue: Venue;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
