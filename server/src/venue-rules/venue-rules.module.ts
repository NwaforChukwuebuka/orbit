import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueRules } from './venue-rules.entity';
import { VenueRulesService } from './venue-rules.service';
import { VenueRulesController } from './venue-rules.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VenueRules])],
  providers: [VenueRulesService],
  controllers: [VenueRulesController],
  exports: [VenueRulesService],
})
export class VenueRulesModule {} 