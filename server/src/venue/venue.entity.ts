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

  @Column({ nullable: false, unique: true })
  subdomain: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  brandColor: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column({ nullable: true })
  streetAddress: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  zipCode: number;

  @Column({ nullable: true })
  businessNum: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.venue)
  users: User[];
}
