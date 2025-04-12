import { Test, TestingModule } from '@nestjs/testing';
import { WorkStationController } from './work_station.controller';

describe('WorkStationController', () => {
  let controller: WorkStationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkStationController],
    }).compile();

    controller = module.get<WorkStationController>(WorkStationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
