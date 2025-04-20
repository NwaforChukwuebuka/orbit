import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestPasswordResetDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
} 