import { z } from 'zod';

export const ChapterSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .min(1, 'Title must not be empty')
    .max(255, 'Title must not exceed 255 characters')
    .trim(),
  content: z.string().min(1, 'Content must not be empty'),
  bookId: z.string().uuid('Invalid book ID format'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Chapter = z.infer<typeof ChapterSchema>;
