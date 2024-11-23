import { Inject, Injectable } from '@nestjs/common';

import { IBookRepository } from '../application';
import { BOOK_REPOSITORY } from '../infrastructure';

@Injectable()
export class DeleteBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: IBookRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
