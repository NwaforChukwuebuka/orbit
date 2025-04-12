import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
} 