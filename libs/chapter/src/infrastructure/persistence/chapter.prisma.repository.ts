import { DatabaseService } from '@lovenovel/database';
import { Paginated, PagingDTO } from '@lovenovel/shared';
import { Injectable } from '@nestjs/common';
import { Chapter as ChapterPrisma } from '@prisma/client';

import {
  ChapterCondDTO,
  CreateChapterDto,
  IChapterRepository,
  UpdateChapterDto,
} from '../../application';
import { Chapter } from '../../domain';

@Injectable()
export class ChapterPrismaRepository implements IChapterRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async get(id: string): Promise<Chapter | null> {
    const data = await this.prisma.chapter.findUnique({
      where: { id },
    });

    if (!data) return null;

    return this._toModel(data);
  }

  async create(dto: CreateChapterDto): Promise<void> {
    const data = {
      title: dto.title,
      content: dto.content,
      bookId: dto.bookId,
    };

    await this.prisma.chapter.create({
      data,
    });
  }

  async update(id: string, data: UpdateChapterDto): Promise<void> {
    await this.prisma.chapter.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.chapter.delete({
      where: { id },
    });
  }

  async list(
    cond: ChapterCondDTO,
    paging: PagingDTO
  ): Promise<Paginated<Chapter>> {
    const where = {
      ...(cond.title && { title: { contains: cond.title } }),
      ...(cond.bookId && { bookId: cond.bookId }),
    };

    const skip = (paging.page - 1) * paging.limit;

    const [items, total] = await Promise.all([
      this.prisma.chapter.findMany({
        where,
        skip: skip,
        take: paging.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.chapter.count({
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

  private _toModel(data: ChapterPrisma): Chapter {
    return { ...data } as Chapter;
  }
}
