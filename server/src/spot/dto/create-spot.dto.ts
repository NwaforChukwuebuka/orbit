import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BookedUser } from '../spot.entity';

export class BookedUserDto implements BookedUser {
  @ApiProperty({
    description: 'UUID of the user who booked the spot',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'ISO timestamp when the spot was booked',
    example: '2024-03-15T10:00:00Z',
  })
  @IsNotEmpty()
  bookingTime: string;
}

export class CreateSpotDto {
  @ApiPropertyOptional({
    description: 'Whether the spot is currently available',
    default: true,
    example: true,
  })
  @ApiProperty({
    description: 'ID of the section this spot belongs to',
    example: '456abcde-f123-45d6-789e-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  sectionId: string;
}
