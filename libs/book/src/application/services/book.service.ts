import { Paginated, PagingDTO } from '@lovenovel/shared';
import { Inject, Injectable } from '@nestjs/common';

import { Book } from '../../domain';
import { BOOK_REPOSITORY } from '../../infrastructure';
import { BookCondDTO, CreateBookDto, UpdateBookDto } from '../dto';
import { IBookRepository, IBookService } from '../ports';

@Injectable()
export class BookService implements IBookService {
  constructor(
    @Inject(BOOK_REPOSITORY) private readonly bookRepo: IBookRepository
  ) {}

  async list(cond: BookCondDTO, paging: PagingDTO): Promise<Paginated<Book>> {
    return await this.bookRepo.list(cond, paging);
  }

  async get(id: string): Promise<Book | null> {
    return await this.bookRepo.get(id);
  }

  async create(dto: CreateBookDto): Promise<void> {
    await this.bookRepo.create(dto);
  }

  async update(id: string, dto: UpdateBookDto): Promise<void> {
    await this.bookRepo.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.bookRepo.delete(id);
  }
}
