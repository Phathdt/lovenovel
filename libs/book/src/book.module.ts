import { DatabaseModule } from '@lovenovel/database';
import { Module, Provider } from '@nestjs/common';

import { BOOK_REPOSITORY, BookPrismaRepository } from './infrastructure';
import { BookHttpController } from './presentation/http/book.controller';
import {
  CreateBookUseCase,
  DeleteBookUseCase,
  GetBookUseCase,
  ListBooksUseCase,
  UpdateBookUseCase,
} from './usecases';

const repositories: Provider[] = [
  { provide: BOOK_REPOSITORY, useClass: BookPrismaRepository },
];

const UseCases = [
  CreateBookUseCase,
  GetBookUseCase,
  UpdateBookUseCase,
  DeleteBookUseCase,
  ListBooksUseCase,
];
@Module({
  imports: [DatabaseModule],
  controllers: [BookHttpController],
  providers: [...repositories, ...UseCases],
  exports: [],
})
export class BookModule {}
