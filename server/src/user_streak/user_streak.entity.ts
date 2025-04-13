import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('user_streak')
export class UserStreak {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.streak, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  user?: User;

  @Column({ name: 'last_activity_date', type: 'date' })
  lastActivityDate: Date;

  @Column({ name: 'streak_count' })
  streakCount: number;

  @Column({ name: 'highest_streak' })
  highestStreak: number;
}
