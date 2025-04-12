import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './datasource/typeorm.module';
import { UsersModule } from './users/users.module';
import { VenueModule } from './venue/venue.module';

@Module({
  imports: [
    TypeOrmModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    UsersModule,
    VenueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
