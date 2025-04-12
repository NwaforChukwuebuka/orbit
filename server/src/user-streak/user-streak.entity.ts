import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('user_streak')
export class UserStreak {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user' })
  userId: string;

  @Column({ name: 'last_activity_date' })
  lastActivityDate: Date;

  @Column({ name: 'streak_count' })
  streakCount: number;

  @Column({ name: 'highest_streak' })
  highestStreak: number;

  @ManyToOne(() => User, user => user.streaks)
  @JoinColumn({ name: 'user' })
  user: User;
} 