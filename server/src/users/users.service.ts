import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  // lets inject user repository to the service layer to interact with the database
  constructor(private userRepo: UserRepository) {}

  async getAllUsers() {
    return await this.userRepo.find();
  }
}
