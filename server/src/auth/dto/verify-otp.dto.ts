import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyOtpDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6, { message: 'OTP must be exactly 6 characters' })
  otp: string;
} 