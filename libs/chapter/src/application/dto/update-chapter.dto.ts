import { createZodDto } from 'nestjs-zod';

import { ChapterSchema } from '../../domain';

export const UpdateChapterSchema = ChapterSchema.pick({
  title: true,
  content: true,
}).partial();

export class UpdateChapterDto extends createZodDto(UpdateChapterSchema) {}
