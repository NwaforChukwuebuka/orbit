import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Venue } from '../venue/venue.entity';
import { Section } from 'src/section/section.entity';

@Entity('work_stations')
export class WorkStation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'street_address' })
  streetAddress: string;

  @Column()
  city: string;

  @Column({ name: 'is_open' })
  isOpen: boolean;

  @Column({ name: 'zip_code' })
  zipCode: number;

  @ManyToOne(() => Venue, (venue) => venue.workStations)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @OneToMany(() => Section, (section) => section.workStation)
  sections: Section[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
