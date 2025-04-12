import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserStreakService } from './user-streak.service';
import { UserStreak } from './user-streak.entity';

@Controller('user-streaks')
export class UserStreakController {
  constructor(private readonly userStreakService: UserStreakService) {}

  @Get()
  findAll(): Promise<UserStreak[]> {
    return this.userStreakService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserStreak | null> {
    return this.userStreakService.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<UserStreak[]> {
    return this.userStreakService.findByUser(userId);
  }

  @Post()
  create(@Body() userStreak: UserStreak): Promise<UserStreak> {
    return this.userStreakService.create(userStreak);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userStreak: UserStreak): Promise<void> {
    return this.userStreakService.update(id, userStreak);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userStreakService.remove(id);
  }
} 