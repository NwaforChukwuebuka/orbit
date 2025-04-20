/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import ModelClient, { ChatCompletionsOutput } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';
import { ConfigService } from '@nestjs/config';
import { AIAgentBookingRequest } from './types/types';
import { SpotService } from 'src/spot/spot.service';
import { CreateBookingDTO } from 'src/booking/dto/create-booking.dto';
import { BookingService } from 'src/booking/booking.service';

@Injectable()
export class AiServiceService {
  private endpoint = 'https://models.github.ai/inference';
  private model = 'openai/gpt-4.1';
  private token: string | undefined;
  private client;
  private initialChatHistory = [
    {
      role: 'system',
      content: `You are an AI assistant for a co-working space platform. Your role is to help users navigate the platform and provide an overview of its features. The platform allows users to:
  
  1. **Book a workspace spot** if available.
  2. **Track their booking streak** by making daily workspace bookings.
  3. **Swap spots with another user** if the other user agrees to the swap.
  
  For booking assistance:
  - Begin by asking the user if they would like to book a workspace spot.
  - If the user confirms, request the following booking details:
    - \`date\` (infer from the user’s response and format as "YYYY-MM-DD")
    - \`startTime\` (infer from the user’s response and format as "YYYY-MM-DDTHH:MM:SSZ")
    - \`endTime\` (infer from the user’s response and format as "YYYY-MM-DDTHH:MM:SSZ")
  
  Ensure all interactions align with the following response structure:
  {
    "isBookRequest": true or false,
    "message": "your response or confirmation",
    "data": {
      "date": "the specified date",
      "startTime": "the specified start time",
      "endTime": "the specified end time"
    }
  }`,
    },
  ];
  private userChatHistoryData = {};
  constructor(
    private configService: ConfigService,
    private spotService: SpotService,
    private bookingService: BookingService,
  ) {
    this.token = this.configService.get<string>('AZURE_OPENAI_API_KEY');
    this.client = this.getClient();
  }

  private getClient() {
    const credential = new AzureKeyCredential(this.token as string);
    const client = ModelClient(this.endpoint, credential);
    return client;
  }

  async sendRequest(message: string, userId: string) {
    const chatHistory = this.userChatHistoryData[userId] || [];
    if (chatHistory.length === 0) {
      this.userChatHistoryData[userId] = this.initialChatHistory;
    }
    const chatHistoryWithUserMessage = [
      ...this.userChatHistoryData[userId],
      { role: 'user', content: message },
    ];
    const body = {
      messages: chatHistoryWithUserMessage,
      max_tokens: 1000,
      temperature: 0.7,
      model: this.model,
    };
    // update the userchatHistoryData with the new message
    this.userChatHistoryData[userId] = chatHistoryWithUserMessage;

    const response = await this.client.path('/chat/completions').post({ body });
    if (response.status !== '200') {
      console.log('response', response);
      throw new Error(
        `Unexpected response: ${response.status} 'Unknown error'}`,
      );
    }
    const result = (response.body as ChatCompletionsOutput).choices[0].message;
    this.userChatHistoryData[userId].push(result);
    return result;
  }

  async aiAgentBookingCreation(payload: AIAgentBookingRequest) {
    const { date, startTime, endTime, userId } = payload;
    // get all available spots for the date
    const availableSpots = await this.spotService.getAllAvailableSpots();
    // pick a random spot
    const randomIndex = Math.floor(Math.random() * availableSpots.length);
    const randomSpot = availableSpots[randomIndex];
    const parsedDate = new Date(date);
    const parsedStartTime = new Date(startTime);
    const parsedEndTime = new Date(endTime);
    // create a booking object
    const bookingPayload: CreateBookingDTO = {
      date: parsedDate,
      startTime: parsedStartTime,
      endTime: parsedEndTime,
      spot: randomSpot.id,
      user: userId,
      title: 'AI Booking',
    };
    // create booking
    await this.bookingService.createBooking(bookingPayload);
  }
}
