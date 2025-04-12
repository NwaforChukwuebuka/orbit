import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from './venue.entity';
import { VenueService } from './venue.service';
import { VenueController } from './venue.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Venue])],
  providers: [VenueService],
  controllers: [VenueController],
  exports: [VenueService],
})
export class VenueModule {} 