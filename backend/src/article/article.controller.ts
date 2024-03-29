import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

@ApiTags('articles')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.create(createArticleDto);
  }

  @Get()
  @ApiOkResponse({
    type: ArticleEntity,
    isArray: true,
  })
  async findAll() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOne(id);
  }

  @Get('drafts')
  @ApiOkResponse({
    type: ArticleEntity,
    isArray: true,
  })
  async findDrafts() {
    return await this.articleService.findDrafts();
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@Param('id') id: string) {
    return await this.articleService.remove(id);
  }
}
