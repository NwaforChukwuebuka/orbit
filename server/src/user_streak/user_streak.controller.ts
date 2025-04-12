import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserStreakService } from './user_streak.service';
import { UserStreak } from './user_streak.entity';

@Controller('user-streak')
export class UserStreakController {
  constructor(private readonly userStreakService: UserStreakService) {}

  @Post()
  create(@Body() createUserStreakDto: any): Promise<UserStreak> {
    return this.userStreakService.create(createUserStreakDto);
  }

  @Get()
  findAll(): Promise<UserStreak[]> {
    return this.userStreakService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserStreak> {
    return this.userStreakService.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<UserStreak> {
    return this.userStreakService.findByUser(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserStreakDto: any,
  ): Promise<UserStreak> {
    return this.userStreakService.update(id, updateUserStreakDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userStreakService.remove(id);
  }

  @Post('increment/:userId')
  incrementStreak(@Param('userId') userId: string): Promise<UserStreak> {
    return this.userStreakService.incrementStreak(userId);
  }

  @Post('reset/:userId')
  resetStreak(@Param('userId') userId: string): Promise<UserStreak> {
    return this.userStreakService.resetStreak(userId);
  }
}
