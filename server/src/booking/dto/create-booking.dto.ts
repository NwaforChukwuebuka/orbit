import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateBookingDTO {
  @IsNotEmpty()
  @IsDateString()
  date: Date;
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;
  @IsNotEmpty()
  @IsDateString()
  endTime: Date;

  user: any;

  @IsNotEmpty()
  spot: any;

  title: string;
}
