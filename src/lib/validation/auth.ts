import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(8, 'Must be at least 8 characters')
    .regex(/[A-ZА-Я]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
});
export type SignUpValues = z.infer<typeof signUpSchema>;
