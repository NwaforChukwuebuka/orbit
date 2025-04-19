import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Query,
} from '@nestjs/common';
import { SpotService } from './spot.service';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Spots')
@Controller('spots')
export class SpotController {
  constructor(private readonly spotService: SpotService) {}

  @Post()
  @Version('1')
  @ApiOperation({
    summary: 'Create a new spot',
    description:
      'Creates a new spot in a work station with specified availability and booking settings',
  })
  @ApiBody({ type: CreateSpotDto, description: 'Spot data to create' })
  @ApiResponse({
    status: 201,
    description: 'Spot successfully created',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        isAvailable: true,
        bookedUser: null,
        sectionId: '456abcde-f123-45d6-789e-426614174000',
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid spot data provided' })
  create(@Body() createSpotDto: CreateSpotDto) {
    return this.spotService.create(createSpotDto);
  }

  @Get()
  @Version('1')
  @ApiOperation({
    summary: 'Get all spots',
    description:
      'Retrieves a list of all spots with their availability status and booking information',
  })
  @ApiResponse({
    status: 200,
    description: 'List of spots retrieved successfully',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          isAvailable: true,
          bookedUser: null,
          sectionId: '456abcde-f123-45d6-789e-426614174000',
          createdAt: '2024-03-15T10:00:00Z',
          updatedAt: '2024-03-15T10:00:00Z',
        },
        {
          id: '234f5678-e89b-12d3-a456-426614174000',
          isAvailable: false,
          bookedUser: {
            userId: '345g6789-e89b-12d3-a456-426614174000',
            bookingTime: '2024-03-15T09:00:00Z',
          },
          sectionId: '456abcde-f123-45d6-789e-426614174000',
          createdAt: '2024-03-15T08:00:00Z',
          updatedAt: '2024-03-15T09:00:00Z',
        },
      ],
    },
  })
  findAll() {
    return this.spotService.findAll();
  }

  @Get(':sectionId')
  async getAllSpotsAvailable(
    @Param('sectionId') sectionId: string,
    @Query('date') date: string,
  ) {
    const parseDate = new Date(date);
    if (isNaN(parseDate.getTime())) {
      throw new Error('Invalid date format');
    }
    return this.spotService.getSpotsBySectionAndTime(sectionId, parseDate);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Get a spot by id',
    description:
      'Retrieves detailed information about a specific spot including its current status',
  })
  @ApiParam({ name: 'id', description: 'Spot unique identifier' })
  @ApiResponse({
    status: 200,
    description: 'Spot retrieved successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        isAvailable: false,
        bookedUser: {
          userId: '345g6789-e89b-12d3-a456-426614174000',
          bookingTime: '2024-03-15T09:00:00Z',
        },
        sectionId: '456abcde-f123-45d6-789e-426614174000',
        createdAt: '2024-03-15T08:00:00Z',
        updatedAt: '2024-03-15T09:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Spot not found' })
  findOne(@Param('id') id: string) {
    return this.spotService.findOne(id);
  }

  @Patch(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Update a spot',
    description:
      'Updates an existing spot with new availability or booking information',
  })
  @ApiParam({ name: 'id', description: 'Spot unique identifier' })
  @ApiBody({ type: UpdateSpotDto, description: 'Updated spot data' })
  @ApiResponse({
    status: 200,
    description: 'Spot updated successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        isAvailable: false,
        bookedUser: {
          userId: '345g6789-e89b-12d3-a456-426614174000',
          bookingTime: '2024-03-15T09:00:00Z',
        },
        sectionId: '456abcde-f123-45d6-789e-426614174000',
        createdAt: '2024-03-15T08:00:00Z',
        updatedAt: '2024-03-15T09:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Spot not found' })
  @ApiResponse({ status: 400, description: 'Invalid update data provided' })
  update(@Param('id') id: string, @Body() updateSpotDto: UpdateSpotDto) {
    return this.spotService.update(id, updateSpotDto);
  }

  @Delete(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Delete a spot',
    description: 'Removes a spot from the system',
  })
  @ApiParam({ name: 'id', description: 'Spot unique identifier' })
  @ApiResponse({
    status: 200,
    description: 'Spot deleted successfully',
    schema: {
      example: {
        message: 'Spot deleted successfully',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Spot not found' })
  remove(@Param('id') id: string) {
    return this.spotService.remove(id);
  }
}
