import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { SwapRequestStatus } from '../swap-request.entity';

export class RespondToSwapRequestDTO {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  swapRequestId: string;
  
  @IsNotEmpty()
  @IsEnum(SwapRequestStatus, {
    message: 'Status must be either accepted, rejected, or cancelled',
  })
  status: SwapRequestStatus.ACCEPTED | SwapRequestStatus.REJECTED | SwapRequestStatus.CANCELLED;
  
  @IsOptional()
  @IsString()
  message?: string;
} 