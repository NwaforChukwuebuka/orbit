import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserStreakService } from './user_streak.service';
import { UserStreak } from './user_streak.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('User Streaks')
@Controller('user-streak')
export class UserStreakController {
  constructor(private readonly userStreakService: UserStreakService) {}

  @Post()
  @ApiOperation({ summary: 'Create user streak', description: 'Create a new user streak record' })
  @ApiBody({ type: UserStreak, description: 'User streak data' })
  @ApiResponse({ 
    status: 201, 
    description: 'User streak created successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: '234f5678-e89b-12d3-a456-426614174000',
        currentStreak: 1,
        highestStreak: 1,
        lastCheckIn: '2024-03-15T10:00:00Z',
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid user streak data' })
  create(@Body() createUserStreakDto: any): Promise<UserStreak> {
    return this.userStreakService.create(createUserStreakDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user streaks', description: 'Retrieve a list of all user streaks' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of user streaks retrieved successfully',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: '234f5678-e89b-12d3-a456-426614174000',
          currentStreak: 5,
          highestStreak: 10,
          lastCheckIn: '2024-03-15T10:00:00Z',
          createdAt: '2024-03-10T10:00:00Z',
          updatedAt: '2024-03-15T10:00:00Z'
        },
        {
          id: '345g6789-e89b-12d3-a456-426614174000',
          userId: '456h7890-e89b-12d3-a456-426614174000',
          currentStreak: 3,
          highestStreak: 15,
          lastCheckIn: '2024-03-15T09:00:00Z',
          createdAt: '2024-03-12T09:00:00Z',
          updatedAt: '2024-03-15T09:00:00Z'
        }
      ]
    }
  })
  findAll(): Promise<UserStreak[]> {
    return this.userStreakService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user streak by ID', description: 'Retrieve user streak by its unique identifier' })
  @ApiParam({ name: 'id', description: 'User streak unique identifier' })
  @ApiResponse({ 
    status: 200, 
    description: 'User streak retrieved successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: '234f5678-e89b-12d3-a456-426614174000',
        currentStreak: 5,
        highestStreak: 10,
        lastCheckIn: '2024-03-15T10:00:00Z',
        createdAt: '2024-03-10T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'User streak not found' })
  findOne(@Param('id') id: string): Promise<UserStreak> {
    return this.userStreakService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get streak by user', description: 'Retrieve streak information for a specific user' })
  @ApiParam({ name: 'userId', description: 'User unique identifier' })
  @ApiResponse({ 
    status: 200, 
    description: 'User streak retrieved successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: '234f5678-e89b-12d3-a456-426614174000',
        currentStreak: 5,
        highestStreak: 10,
        lastCheckIn: '2024-03-15T10:00:00Z',
        createdAt: '2024-03-10T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'User streak not found' })
  findByUser(@Param('userId') userId: string): Promise<UserStreak> {
    return this.userStreakService.findByUser(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user streak', description: 'Update existing user streak by ID' })
  @ApiParam({ name: 'id', description: 'User streak unique identifier' })
  @ApiBody({ type: UserStreak, description: 'Updated user streak data' })
  @ApiResponse({ 
    status: 200, 
    description: 'User streak updated successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: '234f5678-e89b-12d3-a456-426614174000',
        currentStreak: 6,
        highestStreak: 10,
        lastCheckIn: '2024-03-15T11:00:00Z',
        createdAt: '2024-03-10T10:00:00Z',
        updatedAt: '2024-03-15T11:00:00Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'User streak not found' })
  @ApiResponse({ status: 400, description: 'Invalid user streak data' })
  update(
    @Param('id') id: string,
    @Body() updateUserStreakDto: any,
  ): Promise<UserStreak> {
    return this.userStreakService.update(id, updateUserStreakDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user streak', description: 'Delete user streak by ID' })
  @ApiParam({ name: 'id', description: 'User streak unique identifier' })
  @ApiResponse({ 
    status: 200, 
    description: 'User streak deleted successfully',
    schema: {
      example: {
        message: 'User streak deleted successfully',
        statusCode: 200
      }
    }
  })
  @ApiResponse({ status: 404, description: 'User streak not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.userStreakService.remove(id);
  }

  @Post('increment/:userId')
  @ApiOperation({ summary: 'Increment user streak', description: 'Increment the streak count for a specific user' })
  @ApiParam({ name: 'userId', description: 'User unique identifier' })
  @ApiResponse({ 
    status: 200, 
    description: 'User streak incremented successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: '234f5678-e89b-12d3-a456-426614174000',
        currentStreak: 6,
        highestStreak: 10,
        lastCheckIn: '2024-03-15T11:00:00Z',
        createdAt: '2024-03-10T10:00:00Z',
        updatedAt: '2024-03-15T11:00:00Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  incrementStreak(@Param('userId') userId: string): Promise<UserStreak> {
    return this.userStreakService.incrementStreak(userId);
  }

  @Post('reset/:userId')
  @ApiOperation({ summary: 'Reset user streak', description: 'Reset the streak count for a specific user' })
  @ApiParam({ name: 'userId', description: 'User unique identifier' })
  @ApiResponse({ 
    status: 200, 
    description: 'User streak reset successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: '234f5678-e89b-12d3-a456-426614174000',
        currentStreak: 0,
        highestStreak: 10,
        lastCheckIn: '2024-03-15T11:00:00Z',
        createdAt: '2024-03-10T10:00:00Z',
        updatedAt: '2024-03-15T11:00:00Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  resetStreak(@Param('userId') userId: string): Promise<UserStreak> {
    return this.userStreakService.resetStreak(userId);
  }
}
