import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SpotService } from './spot.service';
import { Spot } from './spot.entity';

@Controller('spots')
export class SpotController {
  constructor(private readonly spotService: SpotService) {}

  @Get()
  findAll(): Promise<Spot[]> {
    return this.spotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Spot | null> {
    return this.spotService.findOne(id);
  }

  @Post()
  create(@Body() spot: Spot): Promise<Spot> {
    return this.spotService.create(spot);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() spot: Spot): Promise<void> {
    return this.spotService.update(id, spot);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.spotService.remove(id);
  }
} 