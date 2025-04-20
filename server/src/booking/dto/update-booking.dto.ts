import { IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateBookingDTO {
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @IsNotEmpty()
  @IsDateString()
  endTime: Date;
} 