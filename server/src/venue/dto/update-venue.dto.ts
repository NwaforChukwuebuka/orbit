import { IsEmail, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVenueDto {
  @ApiProperty({
    description: 'Unique subdomain for the venue',
    example: 'my-awesome-venue',
    required: false
  })
  @IsString()
  @IsOptional()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Subdomain must contain only lowercase letters, numbers, and hyphens',
  })
  subdomain?: string;

  @ApiProperty({
    description: 'Name of the venue',
    example: 'The Grand Plaza',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'URL of the venue logo',
    example: 'https://example.com/logo.png',
    required: false
  })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty({
    description: 'Primary brand color in hex format',
    example: '#FF5733',
    required: false
  })
  @IsString()
  @IsOptional()
  brandColor?: string;

  @ApiProperty({
    description: 'Contact email address for the venue',
    example: 'contact@grandplaza.com',
    required: false
  })
  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({
    description: 'Website URL of the venue',
    example: 'https://www.grandplaza.com',
    required: false
  })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+1-555-123-4567',
    required: false
  })
  @IsString()
  @IsOptional()
  contactPhone?: string;

  @ApiProperty({
    description: 'Street address of the venue',
    example: '123 Main Street',
    required: false
  })
  @IsString()
  @IsOptional()
  streetAddress?: string;

  @ApiProperty({
    description: 'City where the venue is located',
    example: 'New York',
    required: false
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    description: 'Postal/ZIP code of the venue location',
    example: 10001,
    required: false
  })
  @IsNumber({}, {
    message: 'zipCode must be a numeric value without quotes (e.g., 106104 not "106104")'
  })
  @IsOptional()
  zipCode?: number;

  @ApiProperty({
    description: 'Business registration number',
    example: 'B123456789',
    required: false
  })
  @IsString()
  @IsOptional()
  businessNum?: string;
} 