/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateAdminUserDTO } from './dto/create-admin-user.dto';
import { VenueService } from 'src/venue/venue.service';
import { TagService } from 'src/tag/tag.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { QueryFailedError } from 'typeorm';

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
    try {
      const venue = await this.venueService.createVenue({
        name: createAdminUserDto.venueName,
        subdomain: createAdminUserDto.venueSubdomain,
      });
      // get the admin tag
      const tag = await this.tagService.findTagByName('Admin');
      // hash password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(
        createAdminUserDto.password,
        salt,
      );
      createAdminUserDto.password = hashedPassword;

      const createAdminUserData = { ...createAdminUserDto, venue, tag };

      const createdUser = this.userRepo.create(createAdminUserData);
      // TODO: Send a email with rabbit or redis pub sub
      return await this.userRepo.save(createdUser);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).code === '23505' // Unique violation in Postgres
      ) {
        throw new HttpException(
          'Venue with this name or subdomain already exists',
          409,
        );
      }

      // rethrow other unexpected errors
      throw error;
    }
    // create a venue first
  }
}
