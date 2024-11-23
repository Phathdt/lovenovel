import { DatabaseModule } from '@lovenovel/database';
import { Module, Provider } from '@nestjs/common';

import { BookService } from './application';
import {
  BOOK_REPOSITORY,
  BOOK_SERVICE,
  BookPrismaRepository,
} from './infrastructure';
import { BookHttpController } from './presentation/http/book.controller';

const repositories: Provider[] = [
  { provide: BOOK_REPOSITORY, useClass: BookPrismaRepository },
];

const services: Provider[] = [{ provide: BOOK_SERVICE, useClass: BookService }];

@Module({
  imports: [DatabaseModule],
  controllers: [BookHttpController],
  providers: [...repositories, ...services],
  exports: [],
})
export class BookModule {}
