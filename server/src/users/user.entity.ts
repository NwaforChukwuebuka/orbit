import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Venue } from 'src/venue/venue.entity';
import { Booking } from 'src/booking/booking.entity';
import { Tag } from 'src/tag/tag.entity';
import { Exclude } from 'class-transformer';
import { UserStreak } from 'src/user_streak/user_streak.entity';

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

  @Column({ nullable: false, unique: true })
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

  @OneToOne(() => UserStreak, (streak) => streak.user, {
    cascade: true,
    nullable: true,
  })
  streak?: UserStreak;
}
