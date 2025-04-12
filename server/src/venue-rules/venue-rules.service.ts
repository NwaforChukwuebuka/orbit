import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VenueRules } from './venue-rules.entity';

@Injectable()
export class VenueRulesService {
  constructor(
    @InjectRepository(VenueRules)
    private venueRulesRepository: Repository<VenueRules>,
  ) {}

  findAll(): Promise<VenueRules[]> {
    return this.venueRulesRepository.find();
  }

  findOne(id: number): Promise<VenueRules | null> {
    return this.venueRulesRepository.findOne({ where: { id } });
  }

  findByVenue(venueId: string): Promise<VenueRules[]> {
    return this.venueRulesRepository.find({ where: { venueId } });
  }

  async create(venueRules: VenueRules): Promise<VenueRules> {
    return this.venueRulesRepository.save(venueRules);
  }

  async update(id: number, venueRules: VenueRules): Promise<void> {
    await this.venueRulesRepository.update(id, venueRules);
  }

  async remove(id: number): Promise<void> {
    await this.venueRulesRepository.delete(id);
  }
} 