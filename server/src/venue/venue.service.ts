import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Venue } from './venue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';

@Injectable()
export class VenueService {
  constructor(
    @InjectRepository(Venue)
    private venueRepository: Repository<Venue>,
  ) {}

  async createVenue(createVenueDto: CreateVenueDto): Promise<Venue> {
    const venue = this.venueRepository.create(createVenueDto);
    return this.venueRepository.save(venue);
  }

  async findAll(): Promise<Venue[]> {
    return await this.venueRepository.find();
  }

  async findOne(id: string): Promise<Venue> {
    const venue = await this.venueRepository.findOneBy({ id });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${id} not found`);
    }
    return venue;
  }

  async findBySubdomain(subdomain: string): Promise<Venue> {
    const venue = await this.venueRepository.findOneBy({ subdomain });
    if (!venue) {
      throw new NotFoundException(`Venue with subdomain ${subdomain} not found`);
    }
    return venue;
  }

  async update(id: string, updateVenueDto: UpdateVenueDto): Promise<Venue> {
    const venue = await this.findOne(id);
    
    // Update the venue with the new data
    Object.assign(venue, updateVenueDto);
    
    return this.venueRepository.save(venue);
  }

  async remove(id: string): Promise<void> {
    const result = await this.venueRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Venue with ID ${id} not found`);
    }
  }
}
