import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsObject, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateBookingSettingsDto {
  @ApiProperty({
    description: 'Visibility rules for the booking',
    example: {
      maxDaysInAdvance: 14,
      minHoursBeforeBooking: 1,
      allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      blackoutDates: ['2024-12-25', '2024-12-26']
    }
  })
  @IsObject()
  @IsNotEmpty()
  visibiltyRules: any;

  @ApiProperty({
    description: 'Lock-in policy for bookings',
    example: '24h-before',
    enum: ['24h-before', '48h-before', 'no-cancellation']
  })
  @IsString()
  @IsNotEmpty()
  lockInPolicy: string;

  @ApiProperty({
    description: 'Whether users can make repeat bookings',
    example: true
  })
  @IsBoolean()
  allowRepeat: boolean;

  @ApiProperty({
    description: 'Whether users can swap spots with others',
    example: true
  })
  @IsBoolean()
  allowSpotSwap: boolean;

  @ApiProperty({
    description: 'ID of the venue these settings belong to',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty()
  venueId: string;
} 