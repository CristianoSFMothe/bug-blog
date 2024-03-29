import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    const existingArticle = await this.prisma.article.findUnique({
      where: {
        title: createArticleDto.title,
      },
    });

    if (existingArticle) {
      throw new BadRequestException(
        'The article with that title already exists',
      );
    }

    return this.prisma.article.create({
      data: createArticleDto,
    });
  }

  async findAll() {
    return await this.prisma.article.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        body: true,
        published: true,
      },
    });
  }

  async findOne(id: string) {
    const article = await this.prisma.article.findFirst({
      where: {
        id,
      },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async findDrafts() {
    return await this.prisma.article.findMany({
      where: {
        published: false,
      },
    });
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const existingArticle = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!existingArticle) {
      throw new Error('Article does not exist or not found');
    }

    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: string) {
    const existingArticle = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!existingArticle) {
      throw new Error('Article not found');
    }

    return this.prisma.article.delete({
      where: {
        id,
      },
    });
  }
}
