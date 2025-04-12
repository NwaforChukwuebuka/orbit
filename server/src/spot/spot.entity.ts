import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { WorkStation } from '../work-station/work-station.entity';

@Entity('spot')
export class Spot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'is_available' })
  isAvailable: boolean;

  @Column({ name: 'booked_user', type: 'json' })
  bookedUser: any;

  @Column({ name: 'work_station' })
  workStationId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: number;

  @ManyToOne(() => WorkStation, workStation => workStation.spots)
  @JoinColumn({ name: 'work_station' })
  workStation: WorkStation;
} 