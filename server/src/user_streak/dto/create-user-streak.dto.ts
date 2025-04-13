import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID, IsNotEmpty, IsDate, IsOptional } from 'class-validator';

export class CreateUserStreakDto {
  @ApiProperty({
    description: 'Current streak count',
    example: 5
  })
  @IsNumber()
  @IsNotEmpty()
  currentStreak: number;

  @ApiProperty({
    description: 'Highest streak achieved',
    example: 15
  })
  @IsNumber()
  @IsOptional()
  highestStreak: number;

  @ApiProperty({
    description: 'Last check-in date',
    example: '2024-03-15T10:00:00Z'
  })
  @IsDate()
  @IsNotEmpty()
  lastCheckIn: Date;

  @ApiProperty({
    description: 'ID of the user this streak belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
} 