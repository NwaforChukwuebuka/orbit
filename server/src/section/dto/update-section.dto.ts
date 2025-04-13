import { IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSectionDto {
  @ApiPropertyOptional({
    description: 'Section name',
    example: 'Quiet Zone Section A',
  })
  @IsOptional()
  @IsString()
  name?: string;

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
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isOpen?: boolean;

  @ApiPropertyOptional({
    description: 'Work Station ID',
    example: '987fcdeb-a654-12d3-b456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  workStationId?: string;
}
