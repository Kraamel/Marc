import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetBookmarksFilterDto } from './dto/get-bookmarks-filter.dto';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { BookmarkStatus } from './BookmarkStatus';
import { BookmarkRepository } from './BookmarkRepository';
import { Bookmark } from './Bookmark';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(BookmarkRepository)
    private bookmarkRepository: BookmarkRepository,
  ) {
  }

  // getAllBookmarks(): Bookmark[] {
  //   return this.bookmarks;
  // }

  getBookmarks(filterDto: GetBookmarksFilterDto): Promise<Bookmark[]> {
    return this.bookmarkRepository.getBookmarks(filterDto);
  }

  async getBookmarkById(id: string): Promise<Bookmark> {
    const found = await this.bookmarkRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Bookmark with ID:"${id}" not found`);
    }
    return found;
  }

  async createBookmark(createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
    return this.bookmarkRepository.createBookmark(createBookmarkDto);
  }

  async updateBookmarkStatus(id: string, status: BookmarkStatus): Promise<Bookmark> {
    const bookmark = await this.getBookmarkById(id);
    bookmark.status = status;
    await bookmark.save();
    return bookmark;
  }

  async deleteBookmark(id: string): Promise<void> {
    const deleted = await this.bookmarkRepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException(`Bookmark with ID:"${id}" not found`);
    }
  }
}
