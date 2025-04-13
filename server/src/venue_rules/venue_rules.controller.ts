import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VenueRulesService } from './venue_rules.service';
import { VenueRules } from './venue_rules.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Venue Rules')
@Controller('venue-rules')
export class VenueRulesController {
  constructor(private readonly venueRulesService: VenueRulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create venue rules', description: 'Create new rules for a venue' })
  @ApiBody({ type: VenueRules, description: 'Venue rules data' })
  @ApiResponse({ 
    status: 201, 
    description: 'Venue rules created successfully',
    schema: {
      example: {
        id: 1,
        maxDuration: 4,
        minDuration: 1,
        maxAdvanceBookingDays: 30,
        guidelines: [
          'No food or drinks in the workspace',
          'Maintain silence in focused work areas',
          'Clean your spot before leaving'
        ],
        venue: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'The Grand Plaza'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid venue rules data' })
  create(@Body() createVenueRulesDto: any): Promise<VenueRules> {
    return this.venueRulesService.create(createVenueRulesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all venue rules', description: 'Retrieve a list of all venue rules' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of venue rules retrieved successfully',
    schema: {
      example: [
        {
          id: 1,
          maxDuration: 4,
          minDuration: 1,
          maxAdvanceBookingDays: 30,
          guidelines: [
            'No food or drinks in the workspace',
            'Maintain silence in focused work areas',
            'Clean your spot before leaving'
          ],
          venue: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'The Grand Plaza'
          }
        },
        {
          id: 2,
          maxDuration: 8,
          minDuration: 2,
          maxAdvanceBookingDays: 60,
          guidelines: [
            'Pets are not allowed',
            'No smoking in the premises',
            'Respect other members privacy'
          ],
          venue: {
            id: '234f5678-e89b-12d3-a456-426614174000',
            name: 'Tech Hub'
          }
        }
      ]
    }
  })
  findAll(): Promise<VenueRules[]> {
    return this.venueRulesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get venue rules by ID', description: 'Retrieve venue rules by their unique identifier' })
  @ApiParam({ name: 'id', description: 'Venue rules unique identifier', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Venue rules retrieved successfully',
    schema: {
      example: {
        id: 1,
        maxDuration: 4,
        minDuration: 1,
        maxAdvanceBookingDays: 30,
        guidelines: [
          'No food or drinks in the workspace',
          'Maintain silence in focused work areas',
          'Clean your spot before leaving'
        ],
        venue: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'The Grand Plaza'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Venue rules not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<VenueRules> {
    return this.venueRulesService.findOne(id);
  }

  @Get('venue/:venueId')
  @ApiOperation({ summary: 'Get rules by venue', description: 'Retrieve all rules for a specific venue' })
  @ApiParam({ name: 'venueId', description: 'Venue unique identifier' })
  @ApiResponse({ 
    status: 200, 
    description: 'Venue rules retrieved successfully',
    schema: {
      example: [
        {
          id: 1,
          maxDuration: 4,
          minDuration: 1,
          maxAdvanceBookingDays: 30,
          guidelines: [
            'No food or drinks in the workspace',
            'Maintain silence in focused work areas',
            'Clean your spot before leaving'
          ],
          venue: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'The Grand Plaza'
          }
        }
      ]
    }
  })
  @ApiResponse({ status: 404, description: 'Venue not found' })
  findByVenue(@Param('venueId') venueId: string): Promise<VenueRules[]> {
    return this.venueRulesService.findByVenue(venueId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update venue rules', description: 'Update existing venue rules by ID' })
  @ApiParam({ name: 'id', description: 'Venue rules unique identifier', type: 'number' })
  @ApiBody({ type: VenueRules, description: 'Updated venue rules data' })
  @ApiResponse({ 
    status: 200, 
    description: 'Venue rules updated successfully',
    schema: {
      example: {
        id: 1,
        maxDuration: 6,
        minDuration: 2,
        maxAdvanceBookingDays: 45,
        guidelines: [
          'No food or drinks in the workspace',
          'Maintain silence in focused work areas',
          'Clean your spot before leaving',
          'New guideline: Mask required in common areas'
        ],
        venue: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'The Grand Plaza'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Venue rules not found' })
  @ApiResponse({ status: 400, description: 'Invalid venue rules data' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVenueRulesDto: any,
  ): Promise<VenueRules> {
    return this.venueRulesService.update(id, updateVenueRulesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete venue rules', description: 'Delete venue rules by ID' })
  @ApiParam({ name: 'id', description: 'Venue rules unique identifier', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Venue rules deleted successfully',
    schema: {
      example: {
        message: 'Venue rules deleted successfully',
        statusCode: 200
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Venue rules not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.venueRulesService.remove(id);
  }
}
