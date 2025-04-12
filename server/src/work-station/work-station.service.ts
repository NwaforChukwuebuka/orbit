import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkStation } from './work-station.entity';

@Injectable()
export class WorkStationService {
  constructor(
    @InjectRepository(WorkStation)
    private workStationRepository: Repository<WorkStation>,
  ) {}

  findAll(): Promise<WorkStation[]> {
    return this.workStationRepository.find();
  }

  findOne(id: string): Promise<WorkStation | null> {
    return this.workStationRepository.findOne({ where: { id } });
  }

  async create(workStation: WorkStation): Promise<WorkStation> {
    return this.workStationRepository.save(workStation);
  }

  async update(id: string, workStation: WorkStation): Promise<void> {
    await this.workStationRepository.update(id, workStation);
  }

  async remove(id: string): Promise<void> {
    await this.workStationRepository.delete(id);
  }
} 