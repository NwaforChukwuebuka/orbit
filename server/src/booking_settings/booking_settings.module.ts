import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingSettingsService } from './booking_settings.service';
import { BookingSettingsController } from './booking_settings.controller';
import { BookingSettings } from './booking_settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingSettings])],
  providers: [BookingSettingsService],
  controllers: [BookingSettingsController],
  exports: [BookingSettingsService]
})
export class BookingSettingsModule {}
