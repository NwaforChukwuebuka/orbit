/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Venue } from 'src/venue/venue.entity';
import { Booking } from 'src/booking/booking.entity';
import { Tag } from 'src/tag/tag.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true, unique: true })
  telephone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => Venue, (venue) => venue.users)
  venue: Venue;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @ManyToOne(() => Tag, (tag) => tag.users)
  tag: Tag;
}
