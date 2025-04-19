/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spot } from './spot.entity';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { Section } from '../section/section.entity';

@Injectable()
export class SpotService {
  constructor(
    @InjectRepository(Spot)
    private spotRepository: Repository<Spot>,
  ) {}

  private getCurrentTimestamp(): number {
    return Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
  }

  async create(createSpotDto: CreateSpotDto): Promise<Spot> {
    try {
      const { sectionId, ...spotData } = createSpotDto;

      // Verify section exists
      const sectionExists = await this.spotRepository.manager.findOne(Section, {
        where: { id: sectionId },
      });

      if (!sectionExists) {
        throw new BadRequestException(
          `Section with ID ${sectionId} does not exist`,
        );
      }

      const spot = this.spotRepository.create({
        ...spotData,
        section: { id: sectionId } as Section,
      });
      return await this.spotRepository.save(spot);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(`Failed to create spot: ${error.message}`);
    }
  }

  async findAll(): Promise<Spot[]> {
    try {
      return await this.spotRepository.find({
        relations: ['section'],
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to retrieve spots: ${error.message}`,
      );
    }
  }
  // getspotswith booked status
  async getSpotsBySectionAndTime(sectionId: string, date: Date) {
    const spots = await this.spotRepository
      .createQueryBuilder('spot')
      .leftJoin('spot.bookings', 'bookings')
      .where('spot.section.id = :sectionId', { sectionId })
      .loadRelationCountAndMap(
        'spot.bookingsAtTime',
        'spot.bookings',
        'bookings',
        (qb) =>
          qb.where(':date BETWEEN bookings.date AND bookings.date', {
            date,
          }),
      )
      .getMany();

    return spots.map((spot) => ({
      ...spot,
      isBooked: (spot as any).bookingsAtTime > 0,
    }));
  }

  async findOne(id: string): Promise<Spot> {
    try {
      const spot = await this.spotRepository.findOne({
        where: { id },
      });

      if (!spot) {
        throw new NotFoundException(`Spot with ID ${id} not found`);
      }

      return spot;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to retrieve spot with ID ${id}: ${error.message}`,
      );
    }
  }

  async update(id: string, updateSpotDto: UpdateSpotDto): Promise<Spot> {
    try {
      const { sectionId, ...spotData } = updateSpotDto;

      // First check if spot exists
      await this.findOne(id);

      // If sectionId provided, verify it exists
      if (sectionId) {
        const sectionExists = await this.spotRepository.manager.findOne(
          Section,
          {
            where: { id: sectionId },
          },
        );

        if (!sectionExists) {
          throw new BadRequestException(
            `Section with ID ${sectionId} does not exist`,
          );
        }
      }

      const updateData: Partial<Spot> = {
        ...spotData,
      };

      if (sectionId) {
        updateData.section = { id: sectionId } as Section;
      }

      await this.spotRepository.update(id, updateData);
      return this.findOne(id);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      )
        throw error;
      throw new BadRequestException(
        `Failed to update spot with ID ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      // First check if spot exists
      await this.findOne(id);

      const result = await this.spotRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(
          `Failed to delete spot with ID ${id}: Spot not found`,
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to delete spot with ID ${id}: ${error.message}`,
      );
    }
  }
}
