import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async createTag(@Body() createTagDto: CreateTagDto): Promise<TagDto> {
    return this.tagService.create(createTagDto);
  }

  @Get(':id')
  async getTag(@Param('id', ParseIntPipe) id: number): Promise<TagDto> {
    return this.tagService.findOne(id);
  }

  @Get()
  async getAllTags(): Promise<TagDto[]> {
    return this.tagService.findAll();
  }
}
