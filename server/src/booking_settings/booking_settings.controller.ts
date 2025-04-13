import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookingSettingsService } from './booking_settings.service';
import { BookingSettings } from './booking_settings.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Booking Settings')
@Controller('booking-settings')
export class BookingSettingsController {
  constructor(private readonly bookingSettingsService: BookingSettingsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create booking settings',
    description: 'Creates new booking settings for a venue'
  })
  @ApiBody({
    type: BookingSettings,
    examples: {
      example1: {
        summary: 'Standard Booking Settings',
        description: 'Example of typical booking settings for a venue',
        value: {
          "visibiltyRules": {
            "maxDaysInAdvance": 14,
            "minHoursBeforeBooking": 1,
            "allowedDays": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "blackoutDates": [
              "2024-12-25",
              "2024-12-26"
            ]
          },
          "lockInPolicy": "24h-before",
          "allowRepeat": true,
          "allowSpotSwap": true,
          "venueId": "234f5678-e89b-12d3-a456-426614174000"
        }
      },
      example2: {
        summary: 'Strict Booking Settings',
        description: 'Example of stricter booking settings with limited availability',
        value: {
          "visibiltyRules": {
            "maxDaysInAdvance": 7,
            "minHoursBeforeBooking": 24,
            "allowedDays": [
              "Monday",
              "Wednesday",
              "Friday"
            ],
            "blackoutDates": [
              "2024-12-25",
              "2024-12-26",
              "2024-01-01"
            ]
          },
          "lockInPolicy": "48h-before",
          "allowRepeat": false,
          "allowSpotSwap": false,
          "venueId": "567h8901-e89b-12d3-a456-426614174000"
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Booking settings created successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        visibiltyRules: {
          maxDaysInAdvance: 14,
          minHoursBeforeBooking: 1,
          allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          blackoutDates: ['2024-12-25', '2024-12-26']
        },
        lockInPolicy: '24h-before',
        allowRepeat: true,
        allowSpotSwap: true,
        venue: {
          id: '234f5678-e89b-12d3-a456-426614174000',
          name: 'The Grand Plaza'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid booking settings data' })
  create(@Body() bookingSettings: Partial<BookingSettings>): Promise<BookingSettings> {
    return this.bookingSettingsService.create(bookingSettings);
  }

  @Get()
  @ApiOperation({ summary: 'Get all booking settings' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all booking settings',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          visibiltyRules: {
            maxDaysInAdvance: 14,
            minHoursBeforeBooking: 1,
            allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            blackoutDates: ['2024-12-25', '2024-12-26']
          },
          lockInPolicy: '24h-before',
          allowRepeat: true,
          allowSpotSwap: true,
          venue: {
            id: '234f5678-e89b-12d3-a456-426614174000',
            name: 'The Grand Plaza'
          }
        },
        {
          id: '345g6789-e89b-12d3-a456-426614174000',
          visibiltyRules: {
            maxDaysInAdvance: 7,
            minHoursBeforeBooking: 24,
            allowedDays: ['Monday', 'Wednesday', 'Friday'],
            blackoutDates: ['2024-12-25', '2024-12-26', '2024-01-01']
          },
          lockInPolicy: '48h-before',
          allowRepeat: false,
          allowSpotSwap: false,
          venue: {
            id: '567h8901-e89b-12d3-a456-426614174000',
            name: 'Tech Hub'
          }
        }
      ]
    }
  })
  findAll(): Promise<BookingSettings[]> {
    return this.bookingSettingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking settings by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Booking settings unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'The booking settings',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        visibiltyRules: {
          maxDaysInAdvance: 14,
          minHoursBeforeBooking: 1,
          allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          blackoutDates: ['2024-12-25', '2024-12-26']
        },
        lockInPolicy: '24h-before',
        allowRepeat: true,
        allowSpotSwap: true,
        venue: {
          id: '234f5678-e89b-12d3-a456-426614174000',
          name: 'The Grand Plaza'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Booking settings not found' })
  findOne(@Param('id') id: string): Promise<BookingSettings> {
    return this.bookingSettingsService.findOne(id);
  }

  @Get('venue/:venueId')
  @ApiOperation({ summary: 'Get booking settings by venue' })
  @ApiParam({ 
    name: 'venueId', 
    description: 'Venue unique identifier',
    example: '234f5678-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'The venue booking settings',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        visibiltyRules: {
          maxDaysInAdvance: 14,
          minHoursBeforeBooking: 1,
          allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          blackoutDates: ['2024-12-25', '2024-12-26']
        },
        lockInPolicy: '24h-before',
        allowRepeat: true,
        allowSpotSwap: true,
        venue: {
          id: '234f5678-e89b-12d3-a456-426614174000',
          name: 'The Grand Plaza'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Venue booking settings not found' })
  findByVenue(@Param('venueId') venueId: string): Promise<BookingSettings> {
    return this.bookingSettingsService.findByVenue(venueId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update booking settings' })
  @ApiParam({ 
    name: 'id', 
    description: 'Booking settings unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({
    type: BookingSettings,
    examples: {
      example1: {
        summary: 'Update Booking Settings',
        description: 'Example of updating booking settings',
        value: {
          "visibiltyRules": {
            "maxDaysInAdvance": 30,
            "minHoursBeforeBooking": 2,
            "allowedDays": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "blackoutDates": [
              "2024-12-25"
            ]
          },
          "lockInPolicy": "24h-before",
          "allowRepeat": true,
          "allowSpotSwap": false
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Booking settings updated successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        visibiltyRules: {
          maxDaysInAdvance: 30,
          minHoursBeforeBooking: 2,
          allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          blackoutDates: ['2024-12-25']
        },
        lockInPolicy: '24h-before',
        allowRepeat: true,
        allowSpotSwap: false,
        venue: {
          id: '234f5678-e89b-12d3-a456-426614174000',
          name: 'The Grand Plaza'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Booking settings not found' })
  @ApiResponse({ status: 400, description: 'Invalid update data' })
  update(
    @Param('id') id: string,
    @Body() bookingSettings: Partial<BookingSettings>,
  ): Promise<BookingSettings> {
    return this.bookingSettingsService.update(id, bookingSettings);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete booking settings' })
  @ApiParam({ 
    name: 'id', 
    description: 'Booking settings unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Booking settings deleted successfully',
    schema: {
      example: {
        message: 'Booking settings deleted successfully',
        statusCode: 200
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Booking settings not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.bookingSettingsService.remove(id);
  }
}
