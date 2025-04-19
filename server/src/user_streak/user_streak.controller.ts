import { Controller } from '@nestjs/common';
import { UserStreakService } from './user_streak.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Streaks')
@Controller('user-streak')
export class UserStreakController {
  constructor(private readonly userStreakService: UserStreakService) {}
}
