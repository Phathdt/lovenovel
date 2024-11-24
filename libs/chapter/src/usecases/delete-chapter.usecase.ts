import { Inject, Injectable } from '@nestjs/common';

import { IChapterRepository } from '../application';
import { CHAPTER_REPOSITORY } from '../infrastructure';

@Injectable()
export class DeleteChapterUseCase {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private readonly chapterRepository: IChapterRepository
  ) {}

  async execute(id: string): Promise<void> {
    return this.chapterRepository.delete(id);
  }
}
