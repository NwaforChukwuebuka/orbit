/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminUserDTO } from 'src/users/dto/create-admin-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from './dto/login-user.dto';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { OwnerAuthGuard } from './permissions/jwt-owner-permission-authguard';

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

  @UseGuards(OwnerAuthGuard)
  @Get('test')
  test() {
    return {
      message: 'Test successful',
      statusCode: 200,
    };
  }
}
