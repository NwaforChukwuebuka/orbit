import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { WorkStationService } from './work-station.service';
import { WorkStation } from './work-station.entity';

@Controller('work-stations')
export class WorkStationController {
  constructor(private readonly workStationService: WorkStationService) {}

  @Get()
  findAll(): Promise<WorkStation[]> {
    return this.workStationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<WorkStation | null> {
    return this.workStationService.findOne(id);
  }

  @Post()
  create(@Body() workStation: WorkStation): Promise<WorkStation> {
    return this.workStationService.create(workStation);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() workStation: WorkStation): Promise<void> {
    return this.workStationService.update(id, workStation);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.workStationService.remove(id);
  }
} 