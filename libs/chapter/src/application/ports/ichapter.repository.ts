import { Paginated, PagingDTO } from '@lovenovel/shared';

import { Chapter } from '../../domain';
import { ChapterCondDTO, CreateChapterDto, UpdateChapterDto } from '../dto';

export interface IChapterRepository {
  get(id: string): Promise<Chapter | null>;
  create(data: CreateChapterDto): Promise<void>;
  update(id: string, data: UpdateChapterDto): Promise<void>;
  delete(id: string): Promise<void>;
  list(cond: ChapterCondDTO, paging: PagingDTO): Promise<Paginated<Chapter>>;
}
