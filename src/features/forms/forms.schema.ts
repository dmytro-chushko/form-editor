import z from 'zod';

export const createFormSchema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  content: z.record(z.any(), z.any()).default({}),
});

export type CreateFormSchema = z.infer<typeof createFormSchema>;
