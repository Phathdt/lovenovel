import { createZodDto } from 'nestjs-zod';

import { BookSchema } from '../../domain/entities';

export const UpdateBookSchema = BookSchema.pick({
  title: true,
  authorId: true,
}).partial();

export class UpdateBookDto extends createZodDto(UpdateBookSchema) {}
