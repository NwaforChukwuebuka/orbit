import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateVenueRulesDto {
  @ApiProperty({
    description: 'Maximum duration (in hours) for a single booking',
    example: 4
  })
  @IsNumber()
  @IsNotEmpty()
  maxDuration: number;

  @ApiProperty({
    description: 'Minimum duration (in hours) for a single booking',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  minDuration: number;

  @ApiProperty({
    description: 'Maximum number of days in advance for booking',
    example: 30
  })
  @IsNumber()
  @IsNotEmpty()
  maxAdvanceBookingDays: number;

  @ApiProperty({
    description: 'List of special rules or guidelines',
    example: [
      'No food or drinks in the workspace',
      'Maintain silence in focused work areas',
      'Clean your spot before leaving'
    ]
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  guidelines: string[];

  @ApiProperty({
    description: 'ID of the venue these rules belong to',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty()
  venueId: string;
} 