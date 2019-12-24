import { Module } from '@nestjs/common';
import { BookmarksModule } from './Bookmark/bookmarks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeOrmConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    BookmarksModule],
})
export class AppModule {}
