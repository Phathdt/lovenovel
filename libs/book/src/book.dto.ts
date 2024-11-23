import { z } from 'zod';

import { BookSchema } from './book.model';

export const CreateBookSchema = BookSchema.pick({
  title: true,
  authorId: true,
}).required();

export type CreateBookDto = z.infer<typeof CreateBookSchema>;

export const UpdateBookSchema = BookSchema.pick({
  title: true,
  authorId: true,
}).partial();

export type UpdateBookDto = z.infer<typeof UpdateBookSchema>;
