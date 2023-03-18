import { randomUUID } from 'crypto';
import { z } from 'zod';

export const ExampleSchema = z.object({
  id: z.string().uuid(),
  username: z.string().trim().min(1),
  email: z.string().email(),
  role: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export class Example {
  id?: string;
  username: string;
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(example: z.infer<typeof ExampleSchema>) {
    example.id = example.id ? example.id : randomUUID();
    Object.assign(this, ExampleSchema.parse(example));
  }
}
