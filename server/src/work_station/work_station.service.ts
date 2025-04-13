import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkStation } from './work_station.entity';
import { VenueService } from '../venue/venue.service';
import { CreateWorkStationDto } from './dto/create-work-station.dto';

@Injectable()
export class WorkStationService {
  constructor(
    @InjectRepository(WorkStation)
    private workStationRepository: Repository<WorkStation>,
    private venueService: VenueService,
  ) {}

  async create(createWorkStationDto: CreateWorkStationDto): Promise<WorkStation> {
    // First verify that the venue exists
    const venue = await this.venueService.findOne(createWorkStationDto.venueId);
    
    if (!venue) {
      throw new BadRequestException(`Venue with ID ${createWorkStationDto.venueId} not found`);
    }

    const workStation = this.workStationRepository.create({
      ...createWorkStationDto,
      venue,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return this.workStationRepository.save(workStation);
  }

  async findAll(): Promise<WorkStation[]> {
    return this.workStationRepository.find({
      relations: ['venue', 'spots']
    });
  }

  async findOne(id: string): Promise<WorkStation> {
    const workStation = await this.workStationRepository.findOne({ 
      where: { id },
      relations: ['venue', 'spots']
    });
    
    if (!workStation) {
      throw new NotFoundException(`WorkStation with ID ${id} not found`);
    }
    
    return workStation;
  }

  async update(id: string, updateWorkStationDto: Partial<WorkStation>): Promise<WorkStation> {
    await this.findOne(id);
    await this.workStationRepository.update(id, {
      ...updateWorkStationDto,
      updatedAt: new Date(),
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.workStationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`WorkStation with ID ${id} not found`);
    }
  }
}
