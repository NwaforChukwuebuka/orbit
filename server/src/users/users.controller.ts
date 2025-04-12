import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
}
