import { z } from 'zod';

export const profileResponseSchema = z.object({
  user: z
    .object({
      id: z.string(),
      email: z.string().email().nullable().optional(),
      name: z.string().nullable().optional(),
      firstName: z.string().nullable().optional(),
      lastName: z.string().nullable().optional(),
      image: z.string().url().nullable().optional(),
    })
    .nullable(),
});
export type ProfileResponse = z.infer<typeof profileResponseSchema>;

export const updateNameSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, 'First name is required')
      .max(64, 'Too long')
      .optional(),
    lastName: z
      .string()
      .trim()
      .min(1, 'Last name is required')
      .max(64, 'Too long')
      .optional(),
  })
  .refine((v) => !!v.firstName || !!v.lastName, {
    message: 'Nothing to update',
    path: ['firstName'],
  });
export type UpdateNameInput = z.infer<typeof updateNameSchema>;

export const avatarUploadRequestSchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().regex(/^image\//, 'Only image types are allowed'),
});
export type AvatarUploadRequest = z.infer<typeof avatarUploadRequestSchema>;

export const avatarUpdateSchema = z.object({
  image: z.string().url(),
});
export type AvatarUpdateInput = z.infer<typeof avatarUpdateSchema>;

export const requestEmailChangeSchema = z.object({
  newEmail: z.string().email(),
});
export type RequestEmailChangeInput = z.infer<typeof requestEmailChangeSchema>;

export const confirmEmailChangeSchema = z.object({
  token: z.string().min(1),
});
export type ConfirmEmailChangeInput = z.infer<typeof confirmEmailChangeSchema>;

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
