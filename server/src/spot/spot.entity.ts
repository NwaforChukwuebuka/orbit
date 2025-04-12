import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { WorkStation } from '../work_station/work_station.entity';

@Entity('spot')
export class Spot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'is_available' })
  isAvailable: boolean;

  @Column({ name: 'booked_user', type: 'json' })
  bookedUser: any;

  @ManyToOne(() => WorkStation)
  @JoinColumn({ name: 'work_station' })
  workStation: WorkStation;

  @Column({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: number;
} 