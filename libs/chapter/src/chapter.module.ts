import { DatabaseModule } from '@lovenovel/database';
import { Module, Provider } from '@nestjs/common';

import { CHAPTER_REPOSITORY, ChapterPrismaRepository } from './infrastructure';
import { ChapterController } from './presentation';
import {
  CreateChapterUseCase,
  DeleteChapterUseCase,
  GetChapterUseCase,
  ListChaptersUseCase,
  UpdateChapterUseCase,
} from './usecases';

const repositories: Provider[] = [
  { provide: CHAPTER_REPOSITORY, useClass: ChapterPrismaRepository },
];

const UseCases = [
  CreateChapterUseCase,
  GetChapterUseCase,
  UpdateChapterUseCase,
  DeleteChapterUseCase,
  ListChaptersUseCase,
];

@Module({
  imports: [DatabaseModule],
  controllers: [ChapterController],
  providers: [...repositories, ...UseCases],
})
export class ChapterModule {}
