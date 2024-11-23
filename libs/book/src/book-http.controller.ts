import { paginatedResponse, PagingDTO } from '@lovenovel/shared';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { BOOK_SERVICE } from './book.di-token';
import { BookCondDTO, CreateBookDto, UpdateBookDto } from './book.dto';
import { IBookService } from './book.port';

@Controller('books')
export class BookHttpController {
  constructor(
    @Inject(BOOK_SERVICE) private readonly bookService: IBookService
  ) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: string) {
    const data = await this.bookService.get(id);

    return data;
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async create(@Body() dto: CreateBookDto) {
    await this.bookService.create(dto);

    return { msg: 'ok' };
  }

  @Get()
  async listBook(@Query() filter: BookCondDTO, @Query() paging: PagingDTO) {
    const result = await this.bookService.list(filter, paging);

    return paginatedResponse(result, filter);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    await this.bookService.update(id, dto);

    return { msg: 'ok' };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Body() dto: CreateBookDto) {
    await this.bookService.create(dto);

    return { msg: 'ok' };
  }
}
