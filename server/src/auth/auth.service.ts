/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  CreateAdminUserDTO,
  CreateOtherUserDTO,
} from 'src/users/dto/create-admin-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginResponse } from './types/login-response';
import { LoginUserDTO } from './dto/login-user.dto';
import * as bc from 'bcryptjs';
import { RedisService } from 'src/common/utils/redis.service';
import { RequestPasswordResetDTO } from './dto/request-password-reset.dto';
import { VerifyOtpDTO } from './dto/verify-otp.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { TaskService } from 'src/task/task.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
    private taskService: TaskService,
  ) {}

  async registerAdminUser(
    createAdminUserDto: CreateAdminUserDTO,
  ): Promise<User> {
    return await this.userService.createAdminUser(createAdminUserDto);
  }

  async registerOtherUser(dto: CreateOtherUserDTO): Promise<User> {
    return await this.userService.createOtherUser(dto);
  }

  async login(loginUserDto: LoginUserDTO): Promise<LoginResponse> {
    const user = await this.userService.getUserDetails(loginUserDto.email);
    if (!user) {
      throw new HttpException('User with the email does not exists', 404);
    }
    const isPasswordValid = await this.validatePassword(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', 400);
    }
    // cache the user
    await this.redisService.set(user.email, JSON.stringify(user), 604000);
    return this.generateTokens(user.email, user.id);
  }

  private generateTokens(email: string, userId: string): LoginResponse {
    const payload = { email, userId };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bc.compare(password, hashedPassword);
  }

  async refreshToken(email: string): Promise<LoginResponse> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new HttpException('User with the email does not exists', 404);
    }
    return this.generateTokens(user.email, user.id);
  }

  async details(email: string): Promise<User> {
    // get user by email
    const user = await this.userService.getUserDetails(email);
    if (!user) {
      throw new HttpException('User with the email does not exists', 404);
    }
    return user;
  }

  async requestPasswordReset(dto: RequestPasswordResetDTO): Promise<void> {
    const { email } = dto;

    // Check if user exists
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new HttpException('User with this email does not exist', 404);
    }

    // Generate OTP
    const otp = this.generateOTP();

    // Store OTP in Redis with 15 minutes expiry
    const otpKey = `password_reset_otp_${email}`;
    await this.redisService.set(otpKey, otp, 15 * 60); // 15 minutes TTL

    // Send OTP email
    const emailData = {
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. This code will expire in 15 minutes.`,
    };

    await this.taskService.sendMailTask(emailData);
  }

  async verifyOTP(dto: VerifyOtpDTO): Promise<{ resetToken: string }> {
    const { email, otp } = dto;

    // Get OTP from Redis
    const otpKey = `password_reset_otp_${email}`;
    const storedOTP = await this.redisService.get(otpKey);

    if (!storedOTP) {
      throw new HttpException('OTP expired or not found', 400);
    }

    if (storedOTP !== otp) {
      throw new HttpException('Invalid OTP', 400);
    }

    // OTP verified, generate reset token
    const resetToken = uuidv4();
    const resetTokenKey = `password_reset_token_${email}`;

    // Store reset token in Redis with 15 minutes expiry
    await this.redisService.set(resetTokenKey, resetToken, 15 * 60);

    // Delete the used OTP
    await this.redisService.del(otpKey);

    return { resetToken };
  }

  async resetPassword(dto: ResetPasswordDTO): Promise<void> {
    const { email, resetToken, newPassword } = dto;

    // Verify reset token
    const resetTokenKey = `password_reset_token_${email}`;
    const storedToken = await this.redisService.get(resetTokenKey);

    if (!storedToken) {
      throw new HttpException('Reset token expired or not found', 400);
    }

    if (storedToken !== resetToken) {
      throw new HttpException('Invalid reset token', 400);
    }

    // Get user
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    // Hash new password
    const salt = await bc.genSalt();
    const hashedPassword = await bc.hash(newPassword, salt);

    // Update user password
    user.password = hashedPassword;
    await this.userService.updateUser(user);

    // Delete reset token
    await this.redisService.del(resetTokenKey);

    // Send confirmation email
    const emailData = {
      to: email,
      subject: 'Password Reset Successful',
      text: 'Your password has been reset successfully.',
    };

    await this.taskService.sendMailTask(emailData);
  }

  private generateOTP(): string {
    // Generate a random 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
