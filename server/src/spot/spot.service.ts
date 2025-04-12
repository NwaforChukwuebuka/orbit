import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spot } from './spot.entity';

@Injectable()
export class SpotService {
  constructor(
    @InjectRepository(Spot)
    private spotRepository: Repository<Spot>,
  ) {}

  findAll(): Promise<Spot[]> {
    return this.spotRepository.find();
  }

  findOne(id: string): Promise<Spot | null> {
    return this.spotRepository.findOne({ where: { id } });
  }

  async create(spot: Spot): Promise<Spot> {
    return this.spotRepository.save(spot);
  }

  async update(id: string, spot: Spot): Promise<void> {
    await this.spotRepository.update(id, spot);
  }

  async remove(id: string): Promise<void> {
    await this.spotRepository.delete(id);
  }
} 