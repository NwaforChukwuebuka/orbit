import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateWorkStationDto {
  @ApiProperty({
    description: 'Name of the work station',
    example: 'Main Floor Workspace',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Street address of the work station',
    example: '123 Business Avenue',
  })
  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @ApiProperty({
    description: 'City where the work station is located',
    example: 'New York',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'ZIP code of the work station location',
    example: 10001,
  })
  @IsNumber()
  @IsNotEmpty()
  zipCode: number;

  @ApiProperty({
    description: 'ID of the venue this work station belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  venueId: string;
}
