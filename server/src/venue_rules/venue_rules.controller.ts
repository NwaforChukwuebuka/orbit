import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VenueRulesService } from './venue_rules.service';
import { VenueRules } from './venue_rules.entity';

@Controller('venue-rules')
export class VenueRulesController {
  constructor(private readonly venueRulesService: VenueRulesService) {}

  @Post()
  create(@Body() createVenueRulesDto: any): Promise<VenueRules> {
    return this.venueRulesService.create(createVenueRulesDto);
  }

  @Get()
  findAll(): Promise<VenueRules[]> {
    return this.venueRulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<VenueRules> {
    return this.venueRulesService.findOne(id);
  }

  @Get('venue/:venueId')
  findByVenue(@Param('venueId') venueId: string): Promise<VenueRules[]> {
    return this.venueRulesService.findByVenue(venueId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVenueRulesDto: any,
  ): Promise<VenueRules> {
    return this.venueRulesService.update(id, updateVenueRulesDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.venueRulesService.remove(id);
  }
}
