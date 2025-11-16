import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Invalid reset link'),
    password: z
      .string()
      .min(8, 'Must be at least 8 characters')
      .regex(/[A-ZА-Я]/, 'Must contain an uppercase letter')
      .regex(/[0-9]/, 'Must contain a number'),
    confirmPassword: z.string().min(8, 'Must be at least 8 characters'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      });
    }
  });
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
