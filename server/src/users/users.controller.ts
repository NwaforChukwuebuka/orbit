/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { GenerateUserInviteCodeDTO } from './dto/generate-invite-code.dto';
import { AdminAuthGuard } from 'src/auth/permissions/jwt-admin-permission-authguard';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers(@GetUser() user: any) {
    const users = await this.userService.getUsersInAVenue(user.venueId);
    return {
      message: 'Users fetch successfully',
      data: users,
      statusCode: 200,
    };
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
