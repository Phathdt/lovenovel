import { DatabaseService } from '@lovenovel/database';
import { Paginated, PagingDTO } from '@lovenovel/shared';
import { Injectable } from '@nestjs/common';
import { Book as BookPrisma } from '@prisma/client';

import {
  BookCondDTO,
  CreateBookDto,
  IBookRepository,
  UpdateBookDto,
} from '../../application';
import { Book } from '../../domain';

@Injectable()
export class BookPrismaRepository implements IBookRepository {
  constructor(private prisma: DatabaseService) {}

  async get(id: string): Promise<Book | null> {
    const data = await this.prisma.book.findUnique({ where: { id } });

    if (!data) return null;

    return this._toModel(data);
  }

  async create(dto: CreateBookDto): Promise<void> {
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
    const where = {
      ...(cond.title && { title: { contains: cond.title } }),
      ...(cond.authorId && { authorId: cond.authorId }),
    };

    const skip = (paging.page - 1) * paging.limit;

    const [items, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip: skip,
        take: paging.limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.book.count({
        where,
        select: { id: true },
      }),
    ]);

    return {
      data: items.map(this._toModel),
      total: total.id,
      paging,
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
