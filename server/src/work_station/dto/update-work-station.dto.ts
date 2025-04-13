import { IsOptional, IsString, IsNumber, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWorkStationDto {
  @ApiPropertyOptional({ 
    description: 'Work station name',
    example: 'Main Floor Workspace'
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ 
    description: 'Street address',
    example: '123 Business Avenue'
  })
  @IsOptional()
  @IsString()
  streetAddress?: string;

  @ApiPropertyOptional({ 
    description: 'City',
    example: 'New York'
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ 
    description: 'Zip code',
    example: 10001
  })
  @IsOptional()
  @IsNumber()
  zipCode?: number;

  @ApiPropertyOptional({ 
    description: 'Venue ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsOptional()
  @IsUUID()
  venueId?: string;
} 