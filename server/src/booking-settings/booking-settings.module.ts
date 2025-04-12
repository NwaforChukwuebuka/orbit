import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingSettings } from './booking-settings.entity';
import { BookingSettingsService } from './booking-settings.service';
import { BookingSettingsController } from './booking-settings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookingSettings])],
  providers: [BookingSettingsService],
  controllers: [BookingSettingsController],
  exports: [BookingSettingsService],
})
export class BookingSettingsModule {} 