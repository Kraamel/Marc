import { BookmarkStatus } from '../BookmarkStatus';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class GetBookmarksFilterDto {
  @IsOptional()
  @IsEnum(BookmarkStatus)
  status: BookmarkStatus;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
