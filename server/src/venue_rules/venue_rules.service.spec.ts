import { Test, TestingModule } from '@nestjs/testing';
import { VenueRulesService } from './venue_rules.service';

describe('VenueRulesService', () => {
  let service: VenueRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VenueRulesService],
    }).compile();

    service = module.get<VenueRulesService>(VenueRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
