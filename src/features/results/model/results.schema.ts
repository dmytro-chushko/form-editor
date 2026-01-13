import z from 'zod';

import { paginationParamsSchema } from '@/lib/validation/paagination';

export const resultOverviewParamsSchema = z
  .object({
    page: z.number(),
    pageSize: z.number(),
    title: z.string(),
    from: z.string(),
    to: z.string(),
  })
  .partial();

export const resultOverviewItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  submissionsCount: z.number(),
});

export const resultOverviewResSchema = z.object({
  items: z.array(resultOverviewItemSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const resultSubFormItemSchema = z.object({
  id: z.string(),
  userEmail: z.string(),
  submittedAt: z.string().nullable(),
  content: z.record(z.string(), z.unknown()).nullable(),
});

export const resultSubFormResSchema = z.object({
  items: z.array(resultSubFormItemSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const formResultParams = paginationParamsSchema.extend({
  email: z.email().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export type ResultsOverviewParams = z.infer<typeof resultOverviewParamsSchema>;
export type ResultsOverviewItem = z.infer<typeof resultOverviewItemSchema>;
export type ResultsOverviewResponse = z.infer<typeof resultOverviewResSchema>;
export type ResultsSubFormItem = z.infer<typeof resultSubFormItemSchema>;
export type ResultsSubFormResponse = z.infer<typeof resultSubFormResSchema>;
export type FormResultsParams = z.infer<typeof formResultParams>;
