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

  // getAllBookmarks(): BookmarkEntity[] {
  //   return this.bookmarks;
  // }

  getBookmarks(filterDto: GetBookmarksFilterDto, user: UserEntity): Promise<BookmarkEntity[]> {
    return this.bookmarkRepository.getBookmarks(filterDto, user);
  }

  async getBookmarkById(id: string, user: UserEntity): Promise<BookmarkEntity> {
    const found = await this.bookmarkRepository.findOne({where: {id, userId: user.id}});
    if (!found) {
      throw new NotFoundException(`Bookmark with ID:"${id}" not found`);
    }
    return found;
  }

  async createBookmark(
    createBookmarkDto: CreateBookmarkDto,
    user: UserEntity): Promise<BookmarkEntity> {
    return this.bookmarkRepository.createBookmark(createBookmarkDto, user);
  }

  async updateBookmarkStatus(
    id: string,
    status: BookmarkStatusEnum,
    user: UserEntity): Promise<BookmarkEntity> {
    const bookmark = await this.getBookmarkById(id, user);
    bookmark.status = status;
    await bookmark.save();
    return bookmark;
  }

  async deleteBookmark(id: string, user: UserEntity): Promise<void> {
    const deleted = await this.bookmarkRepository.delete({id, userId: user.id});
    if (deleted.affected === 0) {
      throw new NotFoundException(`Bookmark with ID:"${id}" not found`);
    }
  }
}
