import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { WorkStation } from '../work_station/work_station.entity';
import { Spot } from '../spot/spot.entity';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => WorkStation)
  @JoinColumn({ name: 'work_station_id' })
  workStation: WorkStation;

  @OneToMany(() => Spot, spot => spot.section)
  spots: Spot[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 