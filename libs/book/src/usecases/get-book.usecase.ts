import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IBookRepository } from '../application';
import { Book } from '../domain';
import { BOOK_REPOSITORY } from '../infrastructure';

@Injectable()
export class GetBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: IBookRepository
  ) {}

  async execute(id: string): Promise<Book> {
    const book = await this.bookRepository.get(id);

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }
}
