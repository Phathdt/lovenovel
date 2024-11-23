import { DatabaseService } from '@lovenovel/database';
import { Injectable } from '@nestjs/common';
import { Book as BookPrisma } from '@prisma/client';

import { CreateBookDto, UpdateBookDto } from './book.dto';
import { Book } from './book.model';
import { IBookRepository } from './book.port';

@Injectable()
export class BookPrismaRepository implements IBookRepository {
  constructor(private prisma: DatabaseService) {}

  async get(id: string): Promise<Book | null> {
    const data = await this.prisma.book.findUnique({ where: { id } });

    if (!data) return null;

    return this._toModel(data);
  }

  async create(dto: CreateBookDto): Promise<void> {
    // TODO: update me later
    const data = {
      title: dto.title,
      authorId: dto.authorId,
    };

    await this.prisma.book.create({ data });
  }

  async update(id: string, dto: UpdateBookDto): Promise<void> {
    await this.prisma.book.update({ where: { id }, data: dto });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.book.delete({ where: { id } });
  }

  private _toModel(data: BookPrisma): Book {
    return { ...data } as Book;
  }
}
