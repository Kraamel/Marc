import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetBookmarksFilterDto } from './dto/get-bookmarks-filter.dto';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { BookmarkStatusEnum } from './bookmark-status.enum';
import { BookmarkRepository } from './bookmark.repository';
import { BookmarkEntity } from './bookmark.entity';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(BookmarkRepository)
    private bookmarkRepository: BookmarkRepository,
  ) {
  }

  public async getBookmarks(filterDto: GetBookmarksFilterDto, user: UserEntity): Promise<BookmarkEntity[]> {
    return await this.bookmarkRepository.getBookmarks(filterDto, user);
  }

  public async getBookmark(id: string, user: UserEntity): Promise<BookmarkEntity> {
    const bookmark = await this.bookmarkRepository.findOne({ where: { id, userId: user.id } });
    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID:"${id}" not found`);
    }
    return bookmark;
  }

  public async createBookmark(createBookmarkDto: CreateBookmarkDto, user: UserEntity): Promise<BookmarkEntity> {
    return this.bookmarkRepository.createBookmark(createBookmarkDto, user);
  }

  public async updateBookmarkStatus(id: string, status: BookmarkStatusEnum, user: UserEntity): Promise<BookmarkEntity> {
    const bookmark = await this.getBookmark(id, user);
    bookmark.status = status;
    await bookmark.save();

    return bookmark;
  }

  public async deleteBookmark(id: string, user: UserEntity): Promise<void> {
    const bookmark = await this.getBookmark(id, user);
    await this.bookmarkRepository.remove(bookmark);
  }
}
