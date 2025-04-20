/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiServiceService } from './ai-service.service';
import { GenerateResponseDto } from './dto/generate-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { AIAgentBookingRequest, JsonObject } from './types/types';
import { TaskService } from 'src/task/task.service';

@Controller('ai-service')
export class AiServiceController {
  constructor(
    private readonly aiServiceService: AiServiceService,
    private readonly taskService: TaskService,
  ) {}

  @Post('generate-response')
  @UseGuards(AuthGuard('jwt'))
  async generateResponse(
    @Body() data: GenerateResponseDto,
    @GetUser() user: any,
  ) {
    const { message } = data;
    const userId: string = user.userId as string;
    const response = await this.aiServiceService.sendRequest(message, userId);
    // TODO: check the response for if book space request
    const jsonObject: JsonObject = JSON.parse(response.content as string);
    console.log('this is the jsonObject', jsonObject);
    const isBookRequest = jsonObject.isBookRequest;
    if (isBookRequest) {
      if (jsonObject.data.date) {
        // SEND BOOKING REQUEST TO a Task Service
        const bookingRequest: AIAgentBookingRequest = {
          date: jsonObject.data.date,
          startTime: jsonObject.data.startTime,
          endTime: jsonObject.data.endTime,
          userId: userId,
        };
        await this.taskService.aiBookingTask(bookingRequest);
      }
    }
    return {
      message: 'Response generated successfully',
      data: jsonObject,
      statusCode: 200,
    };
  }
}
