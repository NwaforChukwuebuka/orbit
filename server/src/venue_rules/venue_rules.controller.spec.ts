import { Test, TestingModule } from '@nestjs/testing';
import { VenueRulesController } from './venue_rules.controller';

describe('VenueRulesController', () => {
  let controller: VenueRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VenueRulesController],
    }).compile();

    controller = module.get<VenueRulesController>(VenueRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
