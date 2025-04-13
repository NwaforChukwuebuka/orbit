import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  UsePipes, 
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Query
} from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { Venue } from './venue.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Venues')
@Controller('venues')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new venue', description: 'Creates a new venue in the system' })
  @ApiResponse({ 
    status: 201, 
    description: 'Venue successfully created',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'The Grand Plaza',
        subdomain: 'grand-plaza',
        logo: 'https://example.com/logo.png',
        brandColor: '#FF5733',
        contactEmail: 'contact@grandplaza.com',
        website: 'https://www.grandplaza.com',
        contactPhone: '+1-555-123-4567',
        streetAddress: '123 Main Street',
        city: 'New York',
        zipCode: 10001,
        businessNum: 'B123456789',
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 409, description: 'Conflict - Venue with this name or subdomain already exists' })
  async create(@Body() createVenueDto: CreateVenueDto): Promise<Venue> {
    return this.venueService.createVenue(createVenueDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all venues', description: 'Retrieves all venues from the system' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all venues',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'The Grand Plaza',
          subdomain: 'grand-plaza',
          logo: 'https://example.com/logo.png',
          brandColor: '#FF5733',
          contactEmail: 'contact@grandplaza.com',
          website: 'https://www.grandplaza.com',
          contactPhone: '+1-555-123-4567',
          streetAddress: '123 Main Street',
          city: 'New York',
          zipCode: 10001,
          businessNum: 'B123456789',
          createdAt: '2024-03-15T10:00:00Z',
          updatedAt: '2024-03-15T10:00:00Z'
        },
        {
          id: '234f5678-e89b-12d3-a456-426614174000',
          name: 'Tech Hub',
          subdomain: 'tech-hub',
          logo: 'https://example.com/techhub-logo.png',
          brandColor: '#4287f5',
          contactEmail: 'info@techhub.com',
          website: 'https://www.techhub.com',
          contactPhone: '+1-555-987-6543',
          streetAddress: '456 Innovation Drive',
          city: 'San Francisco',
          zipCode: 94105,
          businessNum: 'B987654321',
          createdAt: '2024-03-15T09:00:00Z',
          updatedAt: '2024-03-15T09:00:00Z'
        }
      ]
    }
  })
  async findAll(): Promise<Venue[]> {
    return this.venueService.findAll();
  }

  @Get('subdomain/:subdomain')
  @ApiOperation({ summary: 'Find venue by subdomain', description: 'Retrieves a venue by its subdomain' })
  @ApiResponse({ 
    status: 200, 
    description: 'Venue found',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'The Grand Plaza',
        subdomain: 'grand-plaza',
        logo: 'https://example.com/logo.png',
        brandColor: '#FF5733',
        contactEmail: 'contact@grandplaza.com',
        website: 'https://www.grandplaza.com',
        contactPhone: '+1-555-123-4567',
        streetAddress: '123 Main Street',
        city: 'New York',
        zipCode: 10001,
        businessNum: 'B123456789',
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Venue not found' })
  async findBySubdomain(@Param('subdomain') subdomain: string): Promise<Venue> {
    return this.venueService.findBySubdomain(subdomain);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find venue by ID', description: 'Retrieves a venue by its UUID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Venue found',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'The Grand Plaza',
        subdomain: 'grand-plaza',
        logo: 'https://example.com/logo.png',
        brandColor: '#FF5733',
        contactEmail: 'contact@grandplaza.com',
        website: 'https://www.grandplaza.com',
        contactPhone: '+1-555-123-4567',
        streetAddress: '123 Main Street',
        city: 'New York',
        zipCode: 10001,
        businessNum: 'B123456789',
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Venue not found' })
  async findOne(@Param('id') id: string): Promise<Venue> {
    return this.venueService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update venue', description: 'Updates an existing venue by its ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Venue successfully updated',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'The Grand Plaza Updated',
        subdomain: 'grand-plaza',
        logo: 'https://example.com/new-logo.png',
        brandColor: '#33FF57',
        contactEmail: 'new.contact@grandplaza.com',
        website: 'https://www.grandplaza.com',
        contactPhone: '+1-555-123-4567',
        streetAddress: '123 Main Street',
        city: 'New York',
        zipCode: 10001,
        businessNum: 'B123456789',
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T11:00:00Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Venue not found' })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  async update(
    @Param('id') id: string,
    @Body() updateVenueDto: UpdateVenueDto,
  ): Promise<Venue> {
    return this.venueService.update(id, updateVenueDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete venue', description: 'Deletes a venue by its ID' })
  @ApiResponse({ status: 204, description: 'Venue successfully deleted' })
  @ApiResponse({ status: 404, description: 'Venue not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.venueService.remove(id);
  }
}
