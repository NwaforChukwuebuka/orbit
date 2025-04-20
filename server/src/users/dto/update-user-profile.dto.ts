import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateUserProfileDTO {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, {
    message: 'Please provide a valid telephone number',
  })
  telephone?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  oldPassword?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  newPassword?: string;
} 