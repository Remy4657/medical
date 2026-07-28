import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super({
      message: `Không tìm thấy user với id`,
      field: 'id',
    });
  }
}
