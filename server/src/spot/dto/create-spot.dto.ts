import { IsBoolean, IsNotEmpty, IsObject, IsUUID } from 'class-validator';

export class CreateSpotDto {
  @IsBoolean()
  @IsNotEmpty()
  isAvailable: boolean;

  @IsObject()
  bookedUser: any;

  @IsUUID()
  @IsNotEmpty()
  workStation: string;
} 