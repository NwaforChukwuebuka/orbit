import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateResponseDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
