import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './datasource/typeorm.module';
import { UsersModule } from './users/users.module';
import { VenueModule } from './venue/venue.module';
import { BookingSettingsModule } from './booking_settings/booking_settings.module';
import { SpotModule } from './spot/spot.module';
import { WorkStationModule } from './work_station/work_station.module';
import { VenueRulesModule } from './venue_rules/venue_rules.module';
import { UserStreakModule } from './user_streak/user_streak.module';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';
import { EmailModule } from './email/email.module';
import { BullModule } from '@nestjs/bull';
import { TaskModule } from './task/task.module';
import { SectionModule } from './section/section.module';
import { BookingModule } from './booking/booking.module';
@Module({
  imports: [
    TypeOrmModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UsersModule,
    VenueModule,
    BookingSettingsModule,
    SpotModule,
    WorkStationModule,
    VenueRulesModule,
    UserStreakModule,
    AuthModule,
    TagModule,
    EmailModule,
    TaskModule,
    SectionModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
