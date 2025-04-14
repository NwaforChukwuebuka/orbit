import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSectionDto {
  @ApiProperty({
    description: 'Section name',
    example: 'Quiet Zone A',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Section description',
    example:
      'A quiet workspace area with 10 individual desks, perfect for focused work',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Section active status',
    default: true,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isOpen?: boolean;

  @ApiProperty({
    description: 'ID of the work station this section belongs to',
    example: '987fcdeb-a654-12d3-b456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  workStationId: string;
}
