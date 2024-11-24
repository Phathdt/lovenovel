import { createZodDto } from 'nestjs-zod';

import { ChapterSchema } from '../../domain';

export const CreateChapterSchema = ChapterSchema.pick({
  title: true,
  content: true,
  bookId: true,
}).required();

export class CreateChapterDto extends createZodDto(CreateChapterSchema) {}
