/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class GenerateUserInviteCodeDTO {
  @IsNotEmpty()
  @IsNumber()
  tagId: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
