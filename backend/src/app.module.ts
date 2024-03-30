import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ArticleModule } from './article/article.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ArticleModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
