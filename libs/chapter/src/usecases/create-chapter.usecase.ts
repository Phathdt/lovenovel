import { Inject, Injectable } from '@nestjs/common';

import { CreateChapterDto, IChapterRepository } from '../application';
import { CHAPTER_REPOSITORY } from '../infrastructure';

@Injectable()
export class CreateChapterUseCase {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private readonly chapterRepository: IChapterRepository
  ) {}

  async execute(dto: CreateChapterDto): Promise<void> {
    await this.chapterRepository.create(dto);
  }
}
