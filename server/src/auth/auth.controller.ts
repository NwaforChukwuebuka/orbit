import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminUserDTO } from 'src/users/dto/create-admin-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from './dto/login-user.dto';

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
}
