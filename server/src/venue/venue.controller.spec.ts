import { Test, TestingModule } from '@nestjs/testing';
import { VenueController } from './venue.controller';

describe('VenueController', () => {
  let controller: VenueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VenueController],
    }).compile();

    controller = module.get<VenueController>(VenueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
