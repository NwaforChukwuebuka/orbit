import { Module } from '@nestjs/common';
import { VenueService } from './venue.service';
import { VenueController } from './venue.controller';

@Module({
  providers: [VenueService],
  controllers: [VenueController],
})
export class VenueModule {}
