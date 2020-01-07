import { IsNotEmpty} from 'class-validator';

export class CreateBookmarkDto {
  title: string;
  @IsNotEmpty()
  url: string;
}
