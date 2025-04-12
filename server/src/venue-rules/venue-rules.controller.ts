import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { VenueRulesService } from './venue-rules.service';
import { VenueRules } from './venue-rules.entity';

@Controller('venue-rules')
export class VenueRulesController {
  constructor(private readonly venueRulesService: VenueRulesService) {}

  @Get()
  findAll(): Promise<VenueRules[]> {
    return this.venueRulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<VenueRules | null> {
    return this.venueRulesService.findOne(id);
  }

  @Get('venue/:venueId')
  findByVenue(@Param('venueId') venueId: string): Promise<VenueRules[]> {
    return this.venueRulesService.findByVenue(venueId);
  }

  @Post()
  create(@Body() venueRules: VenueRules): Promise<VenueRules> {
    return this.venueRulesService.create(venueRules);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() venueRules: VenueRules): Promise<void> {
    return this.venueRulesService.update(id, venueRules);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.venueRulesService.remove(id);
  }
} 