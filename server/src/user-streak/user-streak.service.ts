import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStreak } from './user-streak.entity';

@Injectable()
export class UserStreakService {
  constructor(
    @InjectRepository(UserStreak)
    private userStreakRepository: Repository<UserStreak>,
  ) {}

  findAll(): Promise<UserStreak[]> {
    return this.userStreakRepository.find();
  }

  findOne(id: string): Promise<UserStreak | null> {
    return this.userStreakRepository.findOne({ where: { id } });
  }

  findByUser(userId: string): Promise<UserStreak[]> {
    return this.userStreakRepository.find({ where: { userId } });
  }

  async create(userStreak: UserStreak): Promise<UserStreak> {
    return this.userStreakRepository.save(userStreak);
  }

  async update(id: string, userStreak: UserStreak): Promise<void> {
    await this.userStreakRepository.update(id, userStreak);
  }

  async remove(id: string): Promise<void> {
    await this.userStreakRepository.delete(id);
  }
} 