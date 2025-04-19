/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Sections')
@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @Version('1')
  @ApiOperation({
    summary: 'Create a new section',
    description:
      'Creates a new section with the provided details including name, description, and venue association',
  })
  @ApiBody({ type: CreateSectionDto, description: 'Section data to create' })
  @ApiResponse({
    status: 201,
    description: 'Section successfully created',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Quiet Zone A',
        description:
          'A quiet workspace area with 10 individual desks, perfect for focused work',
        isActive: true,
        workStationId: '987fcdeb-a654-12d3-b456-426614174000',
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z',
        spots: [],
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid section data provided' })
  async create(@Body() createSectionDto: CreateSectionDto) {
    const data = await this.sectionService.create(createSectionDto);
    return {
      message: 'Section Successfully Created!',
      data,
      statusCode: 201,
    };
  }

  @Get()
  @Version('1')
  @ApiOperation({
    summary: 'Get all sections',
    description: 'Retrieves a list of all sections with their details',
  })
  @ApiResponse({
    status: 200,
    description: 'List of sections retrieved successfully',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Quiet Zone A',
          description: 'A quiet workspace area with 10 individual desks',
          isActive: true,
          workStationId: '987fcdeb-a654-12d3-b456-426614174000',
          createdAt: '2024-03-15T10:00:00Z',
          updatedAt: '2024-03-15T10:00:00Z',
          spots: [
            {
              id: '234f5678-e89b-12d3-a456-426614174000',
              isAvailable: true,
              bookedUser: null,
            },
          ],
        },
        {
          id: '345g6789-e89b-12d3-a456-426614174000',
          name: 'Collaboration Area B',
          description: 'Open workspace for team collaboration',
          isActive: true,
          workStationId: '987fcdeb-a654-12d3-b456-426614174000',
          createdAt: '2024-03-15T09:00:00Z',
          updatedAt: '2024-03-15T09:00:00Z',
          spots: [],
        },
      ],
    },
  })
  findAll() {
    return this.sectionService.findAll();
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Get a section by id',
    description: 'Retrieves detailed information about a specific section',
  })
  @ApiParam({ name: 'id', description: 'Section unique identifier' })
  @ApiResponse({
    status: 200,
    description: 'Section retrieved successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Quiet Zone A',
        description: 'A quiet workspace area with 10 individual desks',
        isActive: true,
        workStationId: '987fcdeb-a654-12d3-b456-426614174000',
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z',
        spots: [
          {
            id: '234f5678-e89b-12d3-a456-426614174000',
            isAvailable: true,
            bookedUser: null,
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Section not found' })
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(id);
  }

  @Patch(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Update a section',
    description: 'Updates an existing section with the provided changes',
  })
  @ApiParam({ name: 'id', description: 'Section unique identifier' })
  @ApiBody({ type: UpdateSectionDto, description: 'Updated section data' })
  @ApiResponse({
    status: 200,
    description: 'Section updated successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Quiet Zone A Updated',
        description: 'Updated description for the quiet workspace area',
        isActive: true,
        workStationId: '987fcdeb-a654-12d3-b456-426614174000',
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T11:00:00Z',
        spots: [
          {
            id: '234f5678-e89b-12d3-a456-426614174000',
            isAvailable: true,
            bookedUser: null,
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Section not found' })
  @ApiResponse({ status: 400, description: 'Invalid update data provided' })
  update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(id, updateSectionDto);
  }

  @Delete(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Delete a section',
    description: 'Removes a section from the system',
  })
  @ApiParam({ name: 'id', description: 'Section unique identifier' })
  @ApiResponse({
    status: 200,
    description: 'Section deleted successfully',
    schema: {
      example: {
        message: 'Section deleted successfully',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Section not found' })
  remove(@Param('id') id: string) {
    return this.sectionService.remove(id);
  }
}
