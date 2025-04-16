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
import { WorkStationService } from './work_station.service';
import { CreateWorkStationDto } from './dto/create-work-station.dto';
import { UpdateWorkStationDto } from './dto/update-work-station.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Work Stations')
@Controller('work-stations')
export class WorkStationController {
  constructor(private readonly workStationService: WorkStationService) {}

  @Post()
  @Version('1')
  @ApiOperation({
    summary: 'Create a new work station',
    description:
      'Creates a new work station with the specified configuration and settings',
  })
  @ApiBody({
    type: CreateWorkStationDto,
    description: 'Work station data to create',
  })
  @ApiResponse({
    status: 201,
    description: 'Work station successfully created',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Main Floor Workspace',
        streetAddress: '123 Business Avenue',
        city: 'New York',
        zipCode: 10001,
        venue: {
          id: '234f5678-e89b-12d3-a456-426614174000',
          name: 'The Grand Plaza',
        },
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid work station data provided',
  })
  async create(@Body() createWorkStationDto: CreateWorkStationDto) {
    const data = await this.workStationService.create(createWorkStationDto);
    return {
      message: 'Workstation created successfully',
      data,
      statusCode: 201,
    };
  }

  @Get()
  @Version('1')
  @ApiOperation({
    summary: 'Get all work stations',
    description:
      'Retrieves a list of all work stations with their configurations',
  })
  @ApiResponse({
    status: 200,
    description: 'List of work stations retrieved successfully',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Main Floor Workspace',
          streetAddress: '123 Business Avenue',
          city: 'New York',
          zipCode: 10001,
          venue: {
            id: '234f5678-e89b-12d3-a456-426614174000',
            name: 'The Grand Plaza',
          },
          createdAt: '2024-03-15T10:00:00Z',
          updatedAt: '2024-03-15T10:00:00Z',
        },
        {
          id: '345g6789-e89b-12d3-a456-426614174000',
          name: 'Second Floor Coworking',
          streetAddress: '456 Enterprise Street',
          city: 'New York',
          zipCode: 10002,
          venue: {
            id: '567h8901-e89b-12d3-a456-426614174000',
            name: 'Tech Hub',
          },
          createdAt: '2024-03-14T09:00:00Z',
          updatedAt: '2024-03-14T09:00:00Z',
        },
      ],
    },
  })
  async findAll() {
    const data = await this.workStationService.findAll();
    return {
      message: 'Workstations Fetched successfully',
      data,
      statusCode: 200,
    };
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Get a work station by id',
    description: 'Retrieves detailed information about a specific work station',
  })
  @ApiParam({ name: 'id', description: 'Work station unique identifier' })
  @ApiResponse({
    status: 200,
    description: 'Work station retrieved successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Main Floor Workspace',
        streetAddress: '123 Business Avenue',
        city: 'New York',
        zipCode: 10001,
        venue: {
          id: '234f5678-e89b-12d3-a456-426614174000',
          name: 'The Grand Plaza',
        },
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Work station not found' })
  async getWorkSpaceDetails(@Param('id') id: string) {
    const data = await this.workStationService.findOneWithDetails(id);
    return {
      message: 'Details Fetched successfully',
      data: data,
      statusCode: 200,
    };
  }

  @Patch(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Update a work station',
    description: 'Updates an existing work station with the provided changes',
  })
  @ApiParam({ name: 'id', description: 'Work station unique identifier' })
  @ApiBody({
    type: UpdateWorkStationDto,
    description: 'Updated work station data',
  })
  @ApiResponse({
    status: 200,
    description: 'Work station updated successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Updated Main Floor Workspace',
        streetAddress: '123 Business Avenue',
        city: 'New York',
        zipCode: 10001,
        venue: {
          id: '234f5678-e89b-12d3-a456-426614174000',
          name: 'The Grand Plaza',
        },
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T11:30:00Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Work station not found' })
  @ApiResponse({ status: 400, description: 'Invalid update data provided' })
  async update(
    @Param('id') id: string,
    @Body() updateWorkStationDto: UpdateWorkStationDto,
  ) {
    const data = await this.workStationService.update(id, updateWorkStationDto);
    return {
      message: 'Work station updated successfully',
      data: data,
      statusCode: 200,
    };
  }

  @Delete(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Delete a work station',
    description: 'Removes a work station from the system',
  })
  @ApiParam({ name: 'id', description: 'Work station unique identifier' })
  @ApiResponse({
    status: 200,
    description: 'Work station deleted successfully',
    schema: {
      example: {
        message: 'Work station deleted successfully',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Work station not found' })
  async remove(@Param('id') id: string) {
    await this.workStationService.remove(id);
    return {
      message: 'Work station deleted successfully',
      statusCode: 204,
    };
  }
}
