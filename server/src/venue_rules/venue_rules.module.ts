import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueRulesService } from './venue_rules.service';
import { VenueRulesController } from './venue_rules.controller';
import { VenueRules } from './venue_rules.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VenueRules])],
  controllers: [VenueRulesController],
  providers: [VenueRulesService],
  exports: [VenueRulesService]
})
export class VenueRulesModule {}
