import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Venue } from '../venue/venue.entity';
import { Tag } from '../tag/tag.entity';
import { Booking } from '../booking/booking.entity';
import { UserStreak } from '../user-streak/user-streak.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_tag_id' })
  userTagId: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  telephone: string;

  @Column({ name: 'venue_id' })
  venueId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Venue, venue => venue.users)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @ManyToOne(() => Tag)
  @JoinColumn({ name: 'user_tag_id' })
  tag: Tag;

  @OneToMany(() => Booking, booking => booking.user)
  bookings: Booking[];

  @OneToMany(() => UserStreak, userStreak => userStreak.user)
  streaks: UserStreak[];
}
