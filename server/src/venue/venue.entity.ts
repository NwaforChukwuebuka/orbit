import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('venues')
export class Venue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subdomain: string;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  brandColor: string;

  @Column()
  contactEmail: string;

  @Column()
  website: string;

  @Column()
  contactPhone: string;

  @Column()
  streetAddress: string;

  @Column()
  city: string;

  @Column()
  zipCode: number;

  @Column()
  businessNum: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.venue)
  users: User[];
}
