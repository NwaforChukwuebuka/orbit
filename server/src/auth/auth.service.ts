import { Injectable } from '@nestjs/common';
import { CreateAdminUserDTO } from 'src/users/dto/create-admin-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async registerAdminUser(
    createAdminUserDto: CreateAdminUserDTO,
  ): Promise<User> {
    return await this.userService.createAdminUser(createAdminUserDto);
  }
}
