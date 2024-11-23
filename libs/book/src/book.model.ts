import { z } from 'zod';

export const BookSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .min(1, 'Title must not be empty')
    .max(255, 'Title must not exceed 255 characters')
    .trim(),
  authorId: z
    .string()
    .uuid('Invalid author ID format')
    .min(36, 'Author ID must be 36 characters')
    .max(36, 'Author ID must be 36 characters'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Book = z.infer<typeof BookSchema>;
