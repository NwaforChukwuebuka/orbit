import { Test, TestingModule } from '@nestjs/testing';
import { WorkStationService } from './work_station.service';

describe('WorkStationService', () => {
  let service: WorkStationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkStationService],
    }).compile();

    service = module.get<WorkStationService>(WorkStationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
