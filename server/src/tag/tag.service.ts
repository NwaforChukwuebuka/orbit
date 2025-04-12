import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  findOne(id: number): Promise<Tag | null> {
    return this.tagRepository.findOne({ where: { id } });
  }

  async create(tag: Tag): Promise<Tag> {
    return this.tagRepository.save(tag);
  }

  async update(id: number, tag: Tag): Promise<void> {
    await this.tagRepository.update(id, tag);
  }

  async remove(id: number): Promise<void> {
    await this.tagRepository.delete(id);
  }
} 