/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminUserDTO } from 'src/users/dto/create-admin-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginResponse } from './types/login-response';
import { LoginUserDTO } from './dto/login-user.dto';
import * as bc from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerAdminUser(
    createAdminUserDto: CreateAdminUserDTO,
  ): Promise<User> {
    return await this.userService.createAdminUser(createAdminUserDto);
  }

  async login(loginUserDto: LoginUserDTO): Promise<LoginResponse> {
    const user = await this.userService.findUserByEmail(loginUserDto.email);
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
    return this.generateTokens(user.email, user.id);
  }

  private generateTokens(email: string, userId: string): LoginResponse {
    const payload = { email, userId };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '60m',
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
}
