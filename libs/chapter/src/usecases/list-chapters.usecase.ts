import { Paginated, PagingDTO } from '@lovenovel/shared';
import { Inject, Injectable } from '@nestjs/common';

import { ChapterCondDTO, IChapterRepository } from '../application';
import { Chapter } from '../domain';
import { CHAPTER_REPOSITORY } from '../infrastructure';

@Injectable()
export class ListChaptersUseCase {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private readonly chapterRepository: IChapterRepository
  ) {}

  async execute(
    cond: ChapterCondDTO,
    paging: PagingDTO
  ): Promise<Paginated<Chapter>> {
    return this.chapterRepository.list(cond, paging);
  }
}
