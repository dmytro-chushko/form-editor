import z from 'zod';

export const createFormSchema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  content: z.record(z.any(), z.any()).default({}),
});

export type CreateFormSchema = z.infer<typeof createFormSchema>;

export const formListResponse = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  content: z.record(z.any(), z.any()),
  id: z.string(),
  isPublished: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type FormListResponse = z.infer<typeof formListResponse>;
