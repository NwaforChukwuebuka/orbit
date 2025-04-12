import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('venue')
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

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @OneToMany(() => User, (user) => user.venue)
  users: User[];
}
