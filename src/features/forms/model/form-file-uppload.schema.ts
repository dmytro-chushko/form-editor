import z from 'zod';

export const fileUploadRequestSchema = z.object({
  fileName: z.string(),
  contentType: z.string(),
  directory: z.string(),
});
