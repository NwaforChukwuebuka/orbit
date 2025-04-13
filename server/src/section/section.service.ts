/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from './section.entity';
import { WorkStationService } from '../work_station/work_station.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
    private workStationService: WorkStationService,
  ) {}

  async findAll(): Promise<Section[]> {
    return this.sectionRepository.find({
      relations: ['workStation', 'spots'],
    });
  }

  async findOne(id: string): Promise<Section> {
    const section = await this.sectionRepository.findOne({
      where: { id },
      relations: ['workStation', 'spots'],
    });

    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }

    return section;
  }

  async create(createSectionDto: CreateSectionDto): Promise<Section> {
    // First verify that the workStation exists
    const workStation = await this.workStationService.findOne(
      createSectionDto.workStationId,
    );

    if (!workStation) {
      throw new BadRequestException(
        `WorkStation with ID ${createSectionDto.workStationId} not found`,
      );
    }

    const section = this.sectionRepository.create({
      name: createSectionDto.name,
      description: createSectionDto.description,
      isOpen: createSectionDto.isOpen ?? true,
      workStation,
    });

    return this.sectionRepository.save(section);
  }

  async update(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<Section> {
    const section = await this.findOne(id);

    if (updateSectionDto.workStationId) {
      // Verify that the new workStation exists if it's being updated
      const workStation = await this.workStationService.findOne(
        updateSectionDto.workStationId,
      );
      if (!workStation) {
        throw new BadRequestException(
          `WorkStation with ID ${updateSectionDto.workStationId} not found`,
        );
      }
      section.workStation = workStation;
    }

    // Update other fields if provided
    if (updateSectionDto.name) section.name = updateSectionDto.name;
    if (updateSectionDto.description !== undefined)
      section.description = updateSectionDto.description;
    if (updateSectionDto.isOpen !== undefined)
      section.isOpen = updateSectionDto.isOpen;

    return this.sectionRepository.save(section);
  }

  async remove(id: string): Promise<void> {
    const result = await this.sectionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
  }
}
