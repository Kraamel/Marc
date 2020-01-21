import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { GetBookmarksFilterDto } from './dto/get-bookmarks-filter.dto';
import { BookmarkStatusEnum } from './bookmark-status.enum';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { BookmarkEntity } from './bookmark.entity';
import { BookmarkStatusValidationPipe } from './pipe/bookmark-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('bookmarks')
@UseGuards(AuthGuard())
export class BookmarksController {
  constructor(private bookmarkService: BookmarksService) {
  }

  @Get()
  getBookmarks(
    @Query(ValidationPipe) filterDto: GetBookmarksFilterDto,
    @GetUser() user: UserEntity): Promise<BookmarkEntity[]> {
    return this.bookmarkService.getBookmarks(filterDto, user);
  }

  @Get('/:id')
  getBookmarkById(
    @Param('id') id: string,
    @GetUser() user: UserEntity ): Promise<BookmarkEntity> {
    return this.bookmarkService.getBookmark(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBookmark(
    @Body() createBookmarkDto: CreateBookmarkDto,
    @GetUser() user: UserEntity): Promise<BookmarkEntity> {
    return this.bookmarkService.createBookmark(createBookmarkDto, user);
  }

  @Patch('/:id/status')
  updateBookmarkStatus(
    @Param('id') id: string,
    @Body('status', BookmarkStatusValidationPipe) status: BookmarkStatusEnum,
    @GetUser() user: UserEntity): Promise<BookmarkEntity> {
    return this.bookmarkService.updateBookmarkStatus(id, status, user);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteBookmark(
    @Param('id') id: string,
    @GetUser() user: UserEntity): Promise<void> {
    return this.bookmarkService.deleteBookmark(id, user);
  }
}
