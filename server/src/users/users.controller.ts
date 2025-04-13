/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { GenerateUserInviteCodeDTO } from './dto/generate-invite-code.dto';
import { AdminAuthGuard } from 'src/auth/permissions/jwt-admin-permission-authguard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Post('invite')
  @UseGuards(AdminAuthGuard)
  async inviteUser(
    @GetUser() user: any,
    @Body() dto: GenerateUserInviteCodeDTO,
  ) {
    const inviteCode = await this.userService.generateInvite(
      dto,
      user.venueId,
      user.userTag,
    );
    return {
      message: 'User successfully Invited!',
      data: {
        inviteCode,
      },
      statusCode: 200,
    };
  }
}
