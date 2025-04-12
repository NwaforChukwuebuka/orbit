import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async createTag(@Body() createTagDto: CreateTagDto): Promise<any> {
    const tag = await this.tagService.create(createTagDto);
    return {
      success: true,
      data: tag,
      message: 'Tag created successfully',
      statusCode: 201,
    };
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
