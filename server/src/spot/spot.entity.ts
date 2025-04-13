import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Section } from '../section/section.entity';
import { ApiProperty } from '@nestjs/swagger';

export interface BookedUser {
  userId: string;
  bookingTime: string;
}

@Entity('spots')
export class Spot {
  @ApiProperty({
    description: 'Unique identifier of the spot',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Whether the spot is currently available',
    example: true,
    default: true,
  })
  @Column({ name: 'is_available' })
  isAvailable: boolean;

  @ApiProperty({
    description: 'Information about the user who booked this spot',
    example: {
      userId: '123e4567-e89b-12d3-a456-426614174000',
      bookingTime: '2024-03-15T10:00:00Z',
    },
    nullable: true,
  })
  @Column({ name: 'booked_user', type: 'json', nullable: true })
  bookedUser: BookedUser | null;

  @ApiProperty({
    description: 'The section this spot belongs to',
    type: () => Section,
  })
  @ManyToOne(() => Section)
  @JoinColumn({ name: 'section_id' })
  section: Section;

  @ApiProperty({
    description: 'Date when the spot was created',
    example: '2024-03-15',
  })
  @Column({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp of the last update',
    example: 1710489600000,
  })
  @Column({ name: 'updated_at' })
  updatedAt: number;
}
