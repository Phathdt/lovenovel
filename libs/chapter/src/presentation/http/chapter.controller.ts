import { paginatedResponse, PagingDTO } from '@lovenovel/shared';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import {
  ChapterCondDTO,
  CreateChapterDto,
  UpdateChapterDto,
} from '../../application';
import {
  CreateChapterUseCase,
  DeleteChapterUseCase,
  GetChapterUseCase,
  ListChaptersUseCase,
  UpdateChapterUseCase,
} from '../../usecases';

@Controller('chapters')
export class ChapterController {
  constructor(
    private readonly createChapterUseCase: CreateChapterUseCase,
    private readonly getChapterUseCase: GetChapterUseCase,
    private readonly updateChapterUseCase: UpdateChapterUseCase,
    private readonly deleteChapterUseCase: DeleteChapterUseCase,
    private readonly listChaptersUseCase: ListChaptersUseCase
  ) {}

  @Get()
  async listChapters(
    @Query() filter: ChapterCondDTO,
    @Query() paging: PagingDTO
  ) {
    const result = await this.listChaptersUseCase.execute(filter, paging);

    return paginatedResponse(result, filter);
  }

  @Post()
  async createChapter(@Body() dto: CreateChapterDto) {
    await this.createChapterUseCase.execute(dto);

    return { msg: 'ok' };
  }

  @Get(':id')
  async getChapter(@Param('id') id: string) {
    return this.getChapterUseCase.execute(id);
  }

  @Put(':id')
  async updateChapter(@Param('id') id: string, @Body() dto: UpdateChapterDto) {
    await this.updateChapterUseCase.execute(id, dto);

    return { msg: 'ok' };
  }

  @Delete(':id')
  async deleteChapter(@Param('id') id: string) {
    await this.deleteChapterUseCase.execute(id);

    return { msg: 'ok' };
  }
}
