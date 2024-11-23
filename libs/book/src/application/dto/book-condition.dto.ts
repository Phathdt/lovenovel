import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const BookCondSchema = z.object({
  title: z.string().optional(),
  authorId: z.string().uuid().optional(),
});

export class BookCondDTO extends createZodDto(BookCondSchema) {}
