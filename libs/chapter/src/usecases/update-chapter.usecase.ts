import { Inject, Injectable } from '@nestjs/common';

import { IChapterRepository, UpdateChapterDto } from '../application';
import { CHAPTER_REPOSITORY } from '../infrastructure';

@Injectable()
export class UpdateChapterUseCase {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private readonly chapterRepository: IChapterRepository
  ) {}

  async execute(id: string, data: UpdateChapterDto): Promise<void> {
    await this.chapterRepository.update(id, data);
  }
}
