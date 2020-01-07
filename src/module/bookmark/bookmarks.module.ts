import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkRepository } from './bookmark.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookmarkRepository]),
    AuthModule,
  ],
  providers: [BookmarksService],
  controllers: [BookmarksController],
})
export class BookmarksModule {}
