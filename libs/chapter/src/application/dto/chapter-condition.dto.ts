import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ChapterCondSchema = z.object({
  title: z.string().optional(),
  bookId: z.string().uuid().optional(),
});

export class ChapterCondDTO extends createZodDto(ChapterCondSchema) {}
