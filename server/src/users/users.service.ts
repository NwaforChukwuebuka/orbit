import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateAdminUserDTO } from './dto/create-admin-user.dto';
import { VenueService } from 'src/venue/venue.service';
import { TagService } from 'src/tag/tag.service';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // lets inject user repository to the service layer to interact with the database
  constructor(
    private userRepo: UserRepository,
    private venueService: VenueService,
    private tagService: TagService,
  ) {}

  async getAllUsers() {
    return await this.userRepo.find();
  }

  async createAdminUser(createAdminUserDto: CreateAdminUserDTO): Promise<User> {
    // create a venue first
    const venue = await this.venueService.createVenue({
      name: createAdminUserDto.venueName,
      subdomain: createAdminUserDto.venueSubdomain,
    });
    // get the admin tag
    const tag = await this.tagService.findTagByName('Admin');
    // hash password

    const createAdminUserData = { ...createAdminUserDto, venue, tag };

    const createdUser = this.userRepo.create(createAdminUserData);
    // TODO: Send a email with rabbit or redis pub sub
    return await this.userRepo.save(createdUser);
  }
}
