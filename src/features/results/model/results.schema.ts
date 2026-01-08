import z from 'zod';

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

export type ResultsOverviewItem = z.infer<typeof resultOverviewItemSchema>;
export type ResultsOverviewResponse = z.infer<typeof resultOverviewResSchema>;
