import { Inject, Injectable } from '@nestjs/common';

import { IBookRepository, UpdateBookDto } from '../application';
import { BOOK_REPOSITORY } from '../infrastructure';

@Injectable()
export class UpdateBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: IBookRepository
  ) {}

  async execute(id: string, dto: UpdateBookDto): Promise<void> {
    await this.bookRepository.update(id, dto);
  }
}
