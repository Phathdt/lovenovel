import { PagingDTO } from '@lovenovel/shared';
import { Inject, Injectable } from '@nestjs/common';

import { BookCondDTO, IBookRepository } from '../application';
import { BOOK_REPOSITORY } from '../infrastructure';

@Injectable()
export class ListBooksUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: IBookRepository
  ) {}

  async execute(filter: BookCondDTO, paging: PagingDTO): Promise<void> {
    await this.bookRepository.list(filter, paging);
  }
}
