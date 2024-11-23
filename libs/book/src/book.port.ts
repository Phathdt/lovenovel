import { Paginated, PagingDTO } from '@lovenovel/shared';

import { BookCondDTO, CreateBookDto, UpdateBookDto } from './book.dto';
import { Book } from './book.model';

export interface IBookRepository {
  get(id: string): Promise<Book | null>;
  create(dto: CreateBookDto): Promise<void>;
  update(id: string, dto: UpdateBookDto): Promise<void>;
  delete(id: string): Promise<void>;
  list(cond: BookCondDTO, paging: PagingDTO): Promise<Paginated<Book>>;
  listByIds(ids: string[]): Promise<Book[]>;
}

export interface IBookService {
  get(id: string): Promise<Book | null>;
  create(dto: CreateBookDto): Promise<void>;
  update(id: string, dto: UpdateBookDto): Promise<void>;
  delete(id: string): Promise<void>;
  list(cond: BookCondDTO, paging: PagingDTO): Promise<Paginated<Book>>;
}
