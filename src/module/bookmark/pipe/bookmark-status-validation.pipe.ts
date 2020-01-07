import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BookmarkStatusEnum } from '../bookmark-status.enum';

export class BookmarkStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = Object.values(BookmarkStatusEnum);

  private isStatusValid(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }

  transform(value: any): any {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is not a valid status`);
    }
  }
}
