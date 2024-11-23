import { DatabaseService } from '@lovenovel/database';
import { Paginated, PagingDTO } from '@lovenovel/shared';
import { Injectable } from '@nestjs/common';
import { Book as BookPrisma } from '@prisma/client';

import { BookCondDTO, CreateBookDto, UpdateBookDto } from './book.dto';
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

  async list(cond: BookCondDTO, paging: PagingDTO): Promise<Paginated<Book>> {
    const { title, authorId, ...rest } = cond;

    let where = {
      ...rest,
    };

    if (authorId) {
      where = {
        ...where,
        authorId: authorId,
      };
    }

    if (title) {
      where = {
        ...where,
        title: { contains: title },
      };
    }

    const total = await this.prisma.book.count({ where });

    const skip = (paging.page - 1) * paging.limit;

    const result = await this.prisma.book.findMany({
      where,
      take: paging.limit,
      skip,
      orderBy: {
        id: 'desc',
      },
    });

    return {
      data: result.map(this._toModel),
      paging,
      total,
    };
  }

  async listByIds(ids: string[]): Promise<Book[]> {
    const result = await this.prisma.book.findMany({
      where: { id: { in: ids } },
    });

    return result.map(this._toModel);
  }

  private _toModel(data: BookPrisma): Book {
    return { ...data } as Book;
  }
}
