import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tag | null> {
    return this.tagService.findOne(id);
  }

  @Post()
  create(@Body() tag: Tag): Promise<Tag> {
    return this.tagService.create(tag);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() tag: Tag): Promise<void> {
    return this.tagService.update(id, tag);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.tagService.remove(id);
  }
} 