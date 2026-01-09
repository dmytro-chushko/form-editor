import z from 'zod';

export const paginationParamsSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
});

export type PaginationParams = z.infer<typeof paginationParamsSchema>;
