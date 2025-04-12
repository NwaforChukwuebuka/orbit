/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
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
import { Venue } from 'src/venue/venue.entity';

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

  async findUserByEmail(email: string) {
    return await this.userRepo.findByEmail(email);
  }

  async getUserDetails(email: string): Promise<User> {
    const user = await this.userRepo.findByEmailWithRelations(email);
    if (!user) {
      throw new HttpException('User with the email does not exists', 404);
    }
    return user;
  }

  async createAdminUser(dto: CreateAdminUserDTO): Promise<User> {
    await this.ensureUserUniqueness(dto.email, dto.telephone);
  
    const venue = await this.createVenueSafely(dto.venueName, dto.venueSubdomain);
  
    const tag = await this.tagService.findTagByName('Owner');
    const hashedPassword = await this.hashPassword(dto.password);
  
    const userData = {
      ...dto,
      password: hashedPassword,
      venue,
      tag,
    };
  
    const user = this.userRepo.create(userData);
    // TODO: Send a welcome email and verification code via RabbitMQ/Redis
    return await this.userRepo.save(user);
  }
  

  private async ensureUserUniqueness(email: string, phone: string): Promise<void> {
    const [emailExists, phoneExists] = await Promise.all([
      this.userRepo.userWithEmailExists(email),
      this.userRepo.userWithPhoneExists(phone),
    ]);
  
    if (emailExists) {
      throw new HttpException('User with the email already exists', 409);
    }
  
    if (phoneExists) {
      throw new HttpException('User with the phone number already exists', 409);
    }
  }

  private async createVenueSafely(name: string, subdomain: string): Promise<Venue> {
    try {
      return await this.venueService.createVenue({ name, subdomain });
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).code === '23505'
      ) {
        throw new HttpException(
          'Venue with this name or subdomain already exists',
          409,
        );
      }
      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
  
}
