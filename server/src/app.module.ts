import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './datasource/typeorm.module';
import { UsersModule } from './users/users.module';
import { VenueModule } from './venue/venue.module';
import { WorkStationModule } from './work-station/work-station.module';
import { SpotModule } from './spot/spot.module';
import { BookingModule } from './booking/booking.module';
import { TagModule } from './tag/tag.module';
import { UserStreakModule } from './user-streak/user-streak.module';
import { VenueRulesModule } from './venue-rules/venue-rules.module';
import { BookingSettingsModule } from './booking-settings/booking-settings.module';

@Module({
  imports: [
    TypeOrmModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    UsersModule,
    VenueModule,
    WorkStationModule,
    SpotModule,
    BookingModule,
    TagModule,
    UserStreakModule,
    VenueRulesModule,
    BookingSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
