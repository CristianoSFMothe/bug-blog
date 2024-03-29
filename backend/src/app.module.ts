import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [PrismaModule, ArticleModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
