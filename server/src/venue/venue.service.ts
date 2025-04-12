import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Venue } from './venue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVenue } from './types/create-venue';
@Injectable()
export class VenueService {
  constructor(
    @InjectRepository(Venue)
    private venueRepository: Repository<Venue>,
  ) {}

  async createVenue(createVenuePayload: CreateVenue): Promise<Venue> {
    // creates a venue for admin user registration
    const venue = this.venueRepository.create(createVenuePayload);
    return this.venueRepository.save(venue);
  }
}
