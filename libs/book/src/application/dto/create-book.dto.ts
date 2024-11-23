import { createZodDto } from 'nestjs-zod';

import { BookSchema } from '../../domain/entities';

export const CreateBookSchema = BookSchema.pick({
  title: true,
  authorId: true,
}).required();

export class CreateBookDto extends createZodDto(CreateBookSchema) {}
