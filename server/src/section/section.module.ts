import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { Section } from './section.entity';
import { WorkStationModule } from '../work_station/work_station.module';

@Module({
  imports: [TypeOrmModule.forFeature([Section]), WorkStationModule],
  providers: [SectionService],
  controllers: [SectionController],
  exports: [SectionService],
})
export class SectionModule {}
