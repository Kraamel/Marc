import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BookmarkStatus } from '../BookmarkStatus';

export class BookmarkStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = Object.values(BookmarkStatus);

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
