import { Test, TestingModule } from '@nestjs/testing';
import { BookingSettingsController } from './booking_settings.controller';

describe('BookingSettingsController', () => {
  let controller: BookingSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingSettingsController],
    }).compile();

    controller = module.get<BookingSettingsController>(BookingSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
