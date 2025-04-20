/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SwapService } from './swap.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { MarkAvailableForSwapDTO } from './dto/mark-available-for-swap.dto';
import { CreateSwapRequestDTO } from './dto/create-swap-request.dto';
import { RespondToSwapRequestDTO } from './dto/respond-to-swap-request.dto';

@Controller('swaps')
export class SwapController {
  constructor(private swapService: SwapService) {}

  @Post('mark-available')
  @UseGuards(AuthGuard('jwt'))
  async markBookingAsAvailableForSwap(
    @Body() dto: MarkAvailableForSwapDTO,
    @GetUser() user: any,
  ) {
    await this.swapService.markBookingAsAvailableForSwap(dto, user.userId);
    return {
      message: dto.availableForSwap
        ? 'Booking marked as available for swap'
        : 'Booking marked as unavailable for swap',
      statusCode: 200,
    };
  }

  @Get('available')
  @UseGuards(AuthGuard('jwt'))
  async getAvailableSwaps(@GetUser() user: any, @Query('date') date?: string) {
    const availableSwaps = await this.swapService.getAvailableSwaps(
      user.userId,
      date,
    );
    return {
      message: 'Available swaps retrieved successfully',
      data: availableSwaps,
      statusCode: 200,
    };
  }

  @Post('request')
  @UseGuards(AuthGuard('jwt'))
  async createSwapRequest(
    @Body() dto: CreateSwapRequestDTO,
    @GetUser() user: any,
  ) {
    const swapRequest = await this.swapService.createSwapRequest(
      dto,
      user.userId,
    );
    return {
      message: 'Swap request created successfully',
      data: swapRequest,
      statusCode: 201,
    };
  }

  @Put('respond')
  @UseGuards(AuthGuard('jwt'))
  async respondToSwapRequest(
    @Body() dto: RespondToSwapRequestDTO,
    @GetUser() user: any,
  ) {
    const swapRequest = await this.swapService.respondToSwapRequest(
      dto,
      user.userId,
    );
    return {
      message: 'Swap request response recorded successfully',
      data: swapRequest,
      statusCode: 200,
    };
  }

  @Get('history')
  @UseGuards(AuthGuard('jwt'))
  async getUserSwapHistory(@GetUser() user: any) {
    const swapHistory = await this.swapService.getUserSwapHistory(user.userId);
    return {
      message: 'Swap history retrieved successfully',
      data: swapHistory,
      statusCode: 200,
    };
  }

  @Get('pending')
  @UseGuards(AuthGuard('jwt'))
  async getPendingSwapRequests(@GetUser() user: any) {
    const pendingRequests = await this.swapService.getPendingSwapRequests(
      user.userId,
    );
    return {
      message: 'Pending swap requests retrieved successfully',
      data: pendingRequests,
      statusCode: 200,
    };
  }
}
