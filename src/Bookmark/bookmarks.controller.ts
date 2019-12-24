import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { GetBookmarksFilterDto } from './dto/get-bookmarks-filter.dto';
import { BookmarkStatus } from './BookmarkStatus';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark } from './Bookmark';
import { BookmarkStatusValidationPipe } from './pipe/bookmark-status-validation.pipe';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarkService: BookmarksService) {
  }

  @Get()
  getBookmarks(@Query(ValidationPipe) filterDto: GetBookmarksFilterDto): Promise<Bookmark[]> {
    return this.bookmarkService.getBookmarks(filterDto);
  }

  @Get('/:id')
  getBookmarkById(@Param('id') id: string): Promise<Bookmark> {
    return this.bookmarkService.getBookmarkById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBookmark(@Body() createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
    return this.bookmarkService.createBookmark(createBookmarkDto);
  }

  @Patch('/:id/status')
  updateBookmarkStatus(@Param('id') id: string, @Body('status', BookmarkStatusValidationPipe) status: BookmarkStatus): Promise<Bookmark> {
    return this.bookmarkService.updateBookmarkStatus(id, status);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteBookmark(@Param('id') id: string): Promise<void> {
    return this.bookmarkService.deleteBookmark(id);
  }
}
