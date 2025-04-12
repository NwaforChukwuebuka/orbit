import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VenueRules } from './venue_rules.entity';

@Injectable()
export class VenueRulesService {
  constructor(
    @InjectRepository(VenueRules)
    private venueRulesRepository: Repository<VenueRules>,
  ) {}

  async findAll(): Promise<VenueRules[]> {
    return this.venueRulesRepository.find({
      relations: ['venue'],
    });
  }

  async findOne(id: number): Promise<VenueRules> {
    const venueRules = await this.venueRulesRepository.findOne({
      where: { id },
      relations: ['venue'],
    });
    
    if (!venueRules) {
      throw new NotFoundException(`Venue rules with ID ${id} not found`);
    }
    
    return venueRules;
  }

  async findByVenue(venueId: string): Promise<VenueRules[]> {
    return this.venueRulesRepository.find({
      where: { venue: { id: venueId } },
      relations: ['venue'],
    });
  }

  async create(createVenueRulesDto: any): Promise<VenueRules> {
    const venueRules = this.venueRulesRepository.create({
      venue: { id: createVenueRulesDto.venue },
    });
    
    return this.venueRulesRepository.save(venueRules);
  }

  async update(id: number, updateVenueRulesDto: any): Promise<VenueRules> {
    const venueRules = await this.findOne(id);
    
    if (updateVenueRulesDto.venue) {
      venueRules.venue = { id: updateVenueRulesDto.venue } as any;
    }
    
    return this.venueRulesRepository.save(venueRules);
  }

  async remove(id: number): Promise<void> {
    const result = await this.venueRulesRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Venue rules with ID ${id} not found`);
    }
  }
}
