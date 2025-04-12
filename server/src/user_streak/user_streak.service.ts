import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStreak } from './user_streak.entity';

@Injectable()
export class UserStreakService {
  constructor(
    @InjectRepository(UserStreak)
    private userStreakRepository: Repository<UserStreak>,
  ) {}

  async findAll(): Promise<UserStreak[]> {
    return this.userStreakRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: string): Promise<UserStreak> {
    const userStreak = await this.userStreakRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    
    if (!userStreak) {
      throw new NotFoundException(`User streak with ID ${id} not found`);
    }
    
    return userStreak;
  }

  async findByUser(userId: string): Promise<UserStreak> {
    const userStreak = await this.userStreakRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    
    if (!userStreak) {
      throw new NotFoundException(`User streak for user with ID ${userId} not found`);
    }
    
    return userStreak;
  }

  async create(createUserStreakDto: any): Promise<UserStreak> {
    const userStreak = this.userStreakRepository.create({
      user: { id: createUserStreakDto.user },
      lastActivityDate: createUserStreakDto.lastActivityDate,
      streakCount: createUserStreakDto.streakCount,
      highestStreak: createUserStreakDto.highestStreak,
    });
    
    return this.userStreakRepository.save(userStreak);
  }

  async update(id: string, updateUserStreakDto: any): Promise<UserStreak> {
    const userStreak = await this.findOne(id);
    
    if (updateUserStreakDto.user) {
      userStreak.user = { id: updateUserStreakDto.user } as any;
    }
    
    if (updateUserStreakDto.lastActivityDate) {
      userStreak.lastActivityDate = updateUserStreakDto.lastActivityDate;
    }
    
    if (updateUserStreakDto.streakCount !== undefined) {
      userStreak.streakCount = updateUserStreakDto.streakCount;
    }
    
    if (updateUserStreakDto.highestStreak !== undefined) {
      userStreak.highestStreak = updateUserStreakDto.highestStreak;
    }
    
    return this.userStreakRepository.save(userStreak);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userStreakRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`User streak with ID ${id} not found`);
    }
  }

  async incrementStreak(userId: string): Promise<UserStreak> {
    const userStreak = await this.findByUser(userId);
    
    userStreak.streakCount += 1;
    userStreak.lastActivityDate = new Date();
    
    if (userStreak.streakCount > userStreak.highestStreak) {
      userStreak.highestStreak = userStreak.streakCount;
    }
    
    return this.userStreakRepository.save(userStreak);
  }

  async resetStreak(userId: string): Promise<UserStreak> {
    const userStreak = await this.findByUser(userId);
    
    userStreak.streakCount = 0;
    userStreak.lastActivityDate = new Date();
    
    return this.userStreakRepository.save(userStreak);
  }
}
