import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Venue } from 'src/venue/venue.entity';
import { Booking } from 'src/booking/booking.entity';
import { Tag } from 'src/tag/tag.entity';
import { Section } from 'src/section/section.entity';
import { WorkStation } from 'src/work_station/work_station.entity';
import { Spot } from 'src/spot/spot.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [
    {
      provide: DataSource,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger();
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            entities: [User, Venue, Booking, Tag, Section, WorkStation, Spot],
            synchronize: true,
          });
          await dataSource.initialize();
          logger.log('Database connected');
          return dataSource;
        } catch (error) {
          console.log(error);
          logger.error(error);
          logger.log('Database connection failed');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
