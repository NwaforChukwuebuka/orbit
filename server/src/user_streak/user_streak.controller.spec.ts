import { Test, TestingModule } from '@nestjs/testing';
import { UserStreakController } from './user_streak.controller';

describe('UserStreakController', () => {
  let controller: UserStreakController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserStreakController],
    }).compile();

    controller = module.get<UserStreakController>(UserStreakController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
