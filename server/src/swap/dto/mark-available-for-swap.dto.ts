import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class MarkAvailableForSwapDTO {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  bookingId: string;

  @IsNotEmpty()
  @IsBoolean()
  availableForSwap: boolean;
}
