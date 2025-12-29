import z from 'zod';

export const formTokenSchema = z.object({
  formId: z.string(),
  expiresAt: z.number(),
  userEmail: z.email().trim().or(z.literal('')).optional(),
});

export type FormTokenSchema = z.infer<typeof formTokenSchema>;
