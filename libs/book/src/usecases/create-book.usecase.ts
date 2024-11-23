import { Inject, Injectable } from '@nestjs/common';

import { CreateBookDto, IBookRepository } from '../application';
import { BOOK_REPOSITORY } from '../infrastructure';

@Injectable()
export class CreateBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: IBookRepository
  ) {}

  async execute(dto: CreateBookDto): Promise<void> {
    await this.bookRepository.create(dto);
  }
}
