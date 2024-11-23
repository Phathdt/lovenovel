import { DatabaseModule } from '@lovenovel/database';
import { Module, Provider } from '@nestjs/common';

import { BookHttpController } from './book-http.controller';
import { BookPrismaRepository } from './book-prisma.repo';
import { BOOK_REPOSITORY, BOOK_SERVICE } from './book.di-token';
import { BookService } from './book.service';

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
