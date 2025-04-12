import { Test, TestingModule } from '@nestjs/testing';
import { UserStreakService } from './user_streak.service';

describe('UserStreakService', () => {
  let service: UserStreakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStreakService],
    }).compile();

    service = module.get<UserStreakService>(UserStreakService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
