import { EntityRepository, Repository } from 'typeorm';
import { GetBookmarksFilterDto } from './dto/get-bookmarks-filter.dto';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { BookmarkEntity } from './bookmark.entity';

@EntityRepository(BookmarkEntity)
export class BookmarkRepository extends Repository<BookmarkEntity> {
  async getBookmarks(filterDto: GetBookmarksFilterDto): Promise<BookmarkEntity[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('bookmark');

    if (search) {
      query.andWhere('(bookmark.title LIKE :search OR bookmark.description LIKE :search)',
        { search: `%${search}%` });
    }
    if (status) {
      query.andWhere('bookmark.status = :status', { status });
    }
    return await query.getMany();
  }

  async createBookmark(createBookmarkDto: CreateBookmarkDto): Promise<BookmarkEntity> {
    const bookmark = new BookmarkEntity();
    Object.assign(bookmark, createBookmarkDto);
    await bookmark.save();
    return bookmark;
  }
}
