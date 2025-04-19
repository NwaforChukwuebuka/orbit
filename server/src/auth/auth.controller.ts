/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAdminUserDTO,
  CreateOtherUserDTO,
} from 'src/users/dto/create-admin-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from './dto/login-user.dto';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { StaffAuthGuard } from './permissions/jwt-staff-permission-authguard';
import { RequestPasswordResetDTO } from './dto/request-password-reset.dto';
import { VerifyOtpDTO } from './dto/verify-otp.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register/admin')
  async registerAdminUser(@Body() createAdminUserDto: CreateAdminUserDTO) {
    const adminUser =
      await this.authService.registerAdminUser(createAdminUserDto);
    return {
      message: 'Admin user registered successfully',
      data: adminUser,
      statusCode: 201,
    };
  }

  @Post('register')
  async registerUser(@Body() dto: CreateOtherUserDTO) {
    const OtherUser = await this.authService.registerOtherUser(dto);
    return {
      message: 'User registered successfully',
      data: OtherUser,
      statusCode: 201,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDTO) {
    const token = await this.authService.login(loginDto);
    return {
      message: 'Login successful',
      data: token,
      statusCode: 200,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('details')
  async getUserDetails(@GetUser() user: any) {
    const data = await this.authService.details(user.email);
    return {
      message: 'User details fetched successfully',
      data: data,
      statusCode: 200,
    };
  }

  @UseGuards(StaffAuthGuard)
  @Get('test')
  test() {
    return {
      message: 'Test successful',
      statusCode: 200,
    };
  }

  @Post('password-reset/request')
  async requestPasswordReset(@Body() dto: RequestPasswordResetDTO) {
    await this.authService.requestPasswordReset(dto);
    return {
      message: 'Password reset OTP sent to your email',
      statusCode: 200,
    };
  }

  @Post('password-reset/verify-otp')
  async verifyOTP(@Body() dto: VerifyOtpDTO) {
    const result = await this.authService.verifyOTP(dto);
    return {
      message: 'OTP verified successfully',
      data: result,
      statusCode: 200,
    };
  }

  @Post('password-reset/reset')
  async resetPassword(@Body() dto: ResetPasswordDTO) {
    await this.authService.resetPassword(dto);
    return {
      message: 'Password reset successful',
      statusCode: 200,
    };
  }
}
