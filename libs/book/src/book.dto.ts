import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { BookSchema } from './book.model';

export const CreateBookSchema = BookSchema.pick({
  title: true,
  authorId: true,
}).required();

export class CreateBookDto extends createZodDto(CreateBookSchema) {}

export const UpdateBookSchema = BookSchema.pick({
  title: true,
  authorId: true,
}).partial();

export class UpdateBookDto extends createZodDto(UpdateBookSchema) {}

export const BookCondSchema = z.object({
  title: z.string().optional(),
  authorId: z.string().uuid().optional(),
});

export class BookCondDTO extends createZodDto(BookCondSchema) {}
