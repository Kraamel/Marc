import { EntityRepository, Repository } from 'typeorm';
import { GetBookmarksFilterDto } from './dto/get-bookmarks-filter.dto';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { BookmarkEntity } from './bookmark.entity';
import { UserEntity } from '../auth/user.entity';
import { BookmarkStatusEnum } from './bookmark-status.enum';

@EntityRepository(BookmarkEntity)
export class BookmarkRepository extends Repository<BookmarkEntity> {
  async getBookmarks(filterDto: GetBookmarksFilterDto, user: UserEntity): Promise<BookmarkEntity[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('bookmark');

    query.where('bookmark.userId = :userId', { userId: user.id });

    if (search) {
      query.andWhere('(bookmark.title LIKE :search OR bookmark.description LIKE :search)',
        { search: `%${search}%` });
    }
    if (status) {
      query.andWhere('bookmark.status = :status', { status });
    }
    return await query.getMany();
  }

  async createBookmark(createBookmarkDto: CreateBookmarkDto, user: UserEntity): Promise<BookmarkEntity> {
    const { title, url } = createBookmarkDto;
    const bookmark = new BookmarkEntity();
    bookmark.title = title;
    bookmark.url = url;
    bookmark.status = BookmarkStatusEnum.TO_TEST;
    bookmark.user = user;
    await bookmark.save();
    // delete bookmark.user;
    return bookmark;
  }
}
