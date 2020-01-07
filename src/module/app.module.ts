import { Module } from '@nestjs/common';
import { BookmarksModule } from './bookmark/bookmarks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../config/typeOrmConfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    BookmarksModule,
    AuthModule],
})
export class AppModule {}
