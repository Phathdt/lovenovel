import { PagingDTO } from '@lovenovel/shared';
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

import { BookCondDTO, CreateBookDto, UpdateBookDto } from '../../application';
import {
  CreateBookUseCase,
  DeleteBookUseCase,
  GetBookUseCase,
  ListBooksUseCase,
  UpdateBookUseCase,
} from '../../usecases';

@Controller('books')
export class BookHttpController {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly getBookUseCase: GetBookUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase,
    private readonly deleteBookUseCase: DeleteBookUseCase,
    private readonly listBooksUseCase: ListBooksUseCase
  ) {}

  @Post()
  async createBook(@Body() dto: CreateBookDto) {
    await this.createBookUseCase.execute(dto);
  }

  @Get(':id')
  async getBook(@Param('id') id: string) {
    return this.getBookUseCase.execute(id);
  }

  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    await this.updateBookUseCase.execute(id, dto);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    await this.deleteBookUseCase.execute(id);
  }

  @Get()
  async listBooks(@Query() cond: BookCondDTO, @Query() paging: PagingDTO) {
    return this.listBooksUseCase.execute(cond, paging);
  }
}
