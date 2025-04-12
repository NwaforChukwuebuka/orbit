import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkStation } from './work-station.entity';
import { WorkStationService } from './work-station.service';
import { WorkStationController } from './work-station.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkStation])],
  providers: [WorkStationService],
  controllers: [WorkStationController],
  exports: [WorkStationService],
})
export class WorkStationModule {} 