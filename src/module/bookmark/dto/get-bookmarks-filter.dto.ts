import { BookmarkStatusEnum } from '../bookmark-status.enum';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class GetBookmarksFilterDto {
  @IsOptional()
  @IsEnum(BookmarkStatusEnum)
  status: BookmarkStatusEnum;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
