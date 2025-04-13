import { IsOptional, IsBoolean, IsUUID, IsObject, ValidateNested } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BookedUserDto } from './create-spot.dto';

export class UpdateSpotDto {
  @ApiPropertyOptional({
    description: 'Whether the spot is currently available',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({
    description: 'Information about the user who booked this spot',
    example: {
      userId: '123e4567-e89b-12d3-a456-426614174000',
      bookingTime: '2024-03-15T10:00:00Z'
    },
    type: BookedUserDto
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => BookedUserDto)
  bookedUser?: BookedUserDto;

  @ApiPropertyOptional({
    description: 'ID of the section this spot belongs to',
    example: '456abcde-f123-45d6-789e-426614174000'
  })
  @IsOptional()
  @IsUUID()
  sectionId?: string;
} 