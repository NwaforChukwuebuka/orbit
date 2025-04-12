import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spot } from './spot.entity';
import { CreateSpotDto } from './dto/create-spot.dto';

@Injectable()
export class SpotService {
  constructor(
    @InjectRepository(Spot)
    private spotRepository: Repository<Spot>,
  ) {}

  async findAll(): Promise<Spot[]> {
    return this.spotRepository.find({
      relations: ['workStation'],
    });
  }

  async findOne(id: string): Promise<Spot> {
    const spot = await this.spotRepository.findOne({
      where: { id },
      relations: ['workStation'],
    });
    if (!spot) {
      throw new NotFoundException(`Spot with ID ${id} not found`);
    }
    return spot;
  }

  async findByWorkStation(workStationId: string): Promise<Spot[]> {
    return this.spotRepository.find({
      where: { workStation: { id: workStationId } },
      relations: ['workStation'],
    });
  }

  async create(createSpotDto: CreateSpotDto): Promise<Spot> {
    const spot = this.spotRepository.create({
      isAvailable: createSpotDto.isAvailable,
      bookedUser: createSpotDto.bookedUser,
      workStation: { id: createSpotDto.workStation },
      createdAt: new Date(),
      updatedAt: Date.now(),
    });
    return this.spotRepository.save(spot);
  }

  async update(id: string, updateSpotDto: Partial<CreateSpotDto>): Promise<Spot> {
    const spot = await this.findOne(id);
    
    if (updateSpotDto.isAvailable !== undefined) {
      spot.isAvailable = updateSpotDto.isAvailable;
    }
    
    if (updateSpotDto.bookedUser) {
      spot.bookedUser = updateSpotDto.bookedUser;
    }
    
    if (updateSpotDto.workStation) {
      spot.workStation = { id: updateSpotDto.workStation } as any;
    }
    
    spot.updatedAt = Date.now();
    
    return this.spotRepository.save(spot);
  }

  async remove(id: string): Promise<void> {
    const result = await this.spotRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Spot with ID ${id} not found`);
    }
  }
}
