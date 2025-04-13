/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateAdminUserDTO, CreateOtherUserDTO } from './dto/create-admin-user.dto';
import { VenueService } from 'src/venue/venue.service';
import { TagService } from 'src/tag/tag.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { QueryFailedError } from 'typeorm';
import { Venue } from 'src/venue/venue.entity';
import { GenerateUserInviteCodeDTO } from './dto/generate-invite-code.dto';
import {v4 as uuidv4} from 'uuid';
import { RedisService } from 'src/common/utils/redis.service';

@Injectable()
export class UsersService {
  // lets inject user repository to the service layer to interact with the database
  constructor(
    private userRepo: UserRepository,
    private venueService: VenueService,
    private tagService: TagService,
    private redisService: RedisService
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


  async generateInvite(dto: GenerateUserInviteCodeDTO, adminVenueId: string, adminTagName: string): Promise<string> {
    // check if user is already invited
    const user = await this.userRepo.findByEmailWithRelations(dto.email);
    if (user?.venue.id === adminVenueId) {
      throw new HttpException('User is already invited', 409);
    }
    // generate uuid
    const inviteId = uuidv4()
    // get tag, for tag id validation
   const userTag =  await this.tagService.findOne(dto.tagId);
   const adminTag = await this.tagService.findTagByName(adminTagName);
   if (userTag?.name === "Owner" && adminTag?.name !== "Owner") {
    throw new HttpException('Admin cannot invite an owner', 400);
   }
    const inviteData = {
      tagId: dto.tagId,
      adminVenueId
    }
    const cacheKey = `${inviteId}-${dto.email}`
    const cacheValue = JSON.stringify(inviteData)
    await this.redisService.set(cacheKey, cacheValue, 60 * 60 * 24) // expires in a day
    // TODO: might want to add the invideId to the fronted query param url for registration
    // Also send and invite email to the user invited
    return inviteId

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


  async createOtherUser(dto: CreateOtherUserDTO): Promise<User> {
    await this.ensureUserUniqueness(dto.email, dto.telephone);
    const cacheKey = `${dto.inviteCode}-${dto.email}`
    const cacheValue = await this.redisService.get(cacheKey)
    const parsedCacheValue = JSON.parse(cacheValue);

    const tag = await this.tagService.findOne(parsedCacheValue.tagId);
    const venue = await this.venueService.findOne(parsedCacheValue.adminVenueId);
    const hashedPassword = await this.hashPassword(dto.password);
    if (!tag || !venue) {
      throw new HttpException('Invalid invite code', 400);
    }
    // remove invitecode from the dto
    delete (dto as Partial<CreateOtherUserDTO>).inviteCode;
    const userData = {
      ...dto,
      password: hashedPassword,
      venue,
      tag,
    };
    const user = this.userRepo.create(userData);
    await this.redisService.del(cacheKey)
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
