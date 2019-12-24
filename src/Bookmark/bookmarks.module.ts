import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkRepository } from './BookmarkRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookmarkRepository]),
  ],
  providers: [BookmarksService],
  controllers: [BookmarksController],
})
export class BookmarksModule {}
