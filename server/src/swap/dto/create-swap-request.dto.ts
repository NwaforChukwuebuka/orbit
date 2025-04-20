import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSwapRequestDTO {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  requestorBookingId: string;
  
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  requestedBookingId: string;
  
  @IsOptional()
  @IsString()
  message?: string;
} 