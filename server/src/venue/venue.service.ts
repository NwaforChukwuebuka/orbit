import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venue } from './venue.entity';

@Injectable()
export class VenueService {
  constructor(
    @InjectRepository(Venue)
    private venueRepository: Repository<Venue>,
  ) {}

  findAll(): Promise<Venue[]> {
    return this.venueRepository.find();
  }

  findOne(id: string): Promise<Venue | null> {
    return this.venueRepository.findOne({ where: { id } });
  }

  async create(venue: Venue): Promise<Venue> {
    return this.venueRepository.save(venue);
  }

  async update(id: string, venue: Venue): Promise<void> {
    await this.venueRepository.update(id, venue);
  }

  async remove(id: string): Promise<void> {
    await this.venueRepository.delete(id);
  }
} 