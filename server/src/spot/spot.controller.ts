import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpotService } from './spot.service';
import { CreateSpotDto } from './dto/create-spot.dto';
import { Spot } from './spot.entity';

@Controller('spot')
export class SpotController {
  constructor(private readonly spotService: SpotService) {}

  @Post()
  create(@Body() createSpotDto: CreateSpotDto): Promise<Spot> {
    return this.spotService.create(createSpotDto);
  }

  @Get()
  findAll(): Promise<Spot[]> {
    return this.spotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Spot> {
    return this.spotService.findOne(id);
  }

  @Get('work-station/:workStationId')
  findByWorkStation(@Param('workStationId') workStationId: string): Promise<Spot[]> {
    return this.spotService.findByWorkStation(workStationId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpotDto: Partial<CreateSpotDto>,
  ): Promise<Spot> {
    return this.spotService.update(id, updateSpotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.spotService.remove(id);
  }
}
