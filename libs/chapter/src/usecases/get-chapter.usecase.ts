import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IChapterRepository } from '../application';
import { Chapter } from '../domain';
import { CHAPTER_REPOSITORY } from '../infrastructure';

@Injectable()
export class GetChapterUseCase {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private readonly chapterRepository: IChapterRepository
  ) {}

  async execute(id: string): Promise<Chapter> {
    const chapter = await this.chapterRepository.get(id);

    if (!chapter) {
      throw new NotFoundException(`Chapter with id ${id} not found`);
    }

    return chapter;
  }
}
