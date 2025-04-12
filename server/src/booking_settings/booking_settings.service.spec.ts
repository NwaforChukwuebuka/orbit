import { Test, TestingModule } from '@nestjs/testing';
import { BookingSettingsService } from './booking_settings.service';

describe('BookingSettingsService', () => {
  let service: BookingSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingSettingsService],
    }).compile();

    service = module.get<BookingSettingsService>(BookingSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
