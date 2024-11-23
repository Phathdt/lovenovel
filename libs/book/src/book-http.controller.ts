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
} from '@nestjs/common';

import { BOOK_SERVICE } from './book.di-token';
import { CreateBookDto, UpdateBookDto } from './book.dto';
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

    return { data };
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async create(@Body() dto: CreateBookDto) {
    const data = await this.bookService.create(dto);

    return { data };
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    const data = await this.bookService.update(id, dto);

    return { data };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Body() dto: CreateBookDto) {
    const data = await this.bookService.create(dto);

    return { data };
  }
}
