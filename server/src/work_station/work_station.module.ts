import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkStationService } from './work_station.service';
import { WorkStationController } from './work_station.controller';
import { WorkStation } from './work_station.entity';
import { VenueModule } from '../venue/venue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkStation]),
    VenueModule
  ],
  controllers: [WorkStationController],
  providers: [WorkStationService],
  exports: [WorkStationService]
})
export class WorkStationModule {}
