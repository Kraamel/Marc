import { EntityRepository, Repository } from 'typeorm';
import { GetBookmarksFilterDto } from './dto/get-bookmarks-filter.dto';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark } from './Bookmark';

@EntityRepository(Bookmark)
export class BookmarkRepository extends Repository<Bookmark> {
  async getBookmarks(filterDto: GetBookmarksFilterDto): Promise<Bookmark[]> {
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

  async createBookmark(createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
    const bookmark = new Bookmark();
    Object.assign(bookmark, createBookmarkDto);
    await bookmark.save();
    return bookmark;
  }
}
