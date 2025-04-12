import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { VenueService } from './venue.service';
import { Venue } from './venue.entity';

@Controller('venues')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Get()
  findAll(): Promise<Venue[]> {
    return this.venueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Venue | null> {
    return this.venueService.findOne(id);
  }

  @Post()
  create(@Body() venue: Venue): Promise<Venue> {
    return this.venueService.create(venue);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() venue: Venue): Promise<void> {
    return this.venueService.update(id, venue);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.venueService.remove(id);
  }
} 