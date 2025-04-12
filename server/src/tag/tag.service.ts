import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<TagDto> {
    const tag = this.tagRepository.create(createTagDto);
    const savedTag = await this.tagRepository.save(tag);
    return this.mapToDto(savedTag);
  }

  async findOne(id: number): Promise<TagDto> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException(`Tag with ID "${id}" not found`);
    }
    return this.mapToDto(tag);
  }

  async findAll(): Promise<TagDto[]> {
    const tags = await this.tagRepository.find();
    return tags.map((tag) => this.mapToDto(tag));
  }

  async findTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });
    if (!tag) {
      throw new NotFoundException(`Tag with name "${name}" not found`);
    }

    return tag;
  }

  private mapToDto(tag: Tag): TagDto {
    const tagDto = new TagDto();
    tagDto.id = tag.id;
    tagDto.name = tag.name;
    return tagDto;
  }
}
