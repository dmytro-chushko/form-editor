import type { Data } from '@measured/puck';
import z from 'zod';

import type { Components, RootProps } from '@/features/puck/types';

// Strongly-typed Puck content
export type FormContent = Data<Components, RootProps>;

export const defaultFormContent: FormContent = {
  content: [],
  root: { props: { title: '', description: '' } },
};

const puckComponentDataSchema = z.object({
  type: z.string(),
  props: z.record(z.string(), z.any()).default({}),
});

const puckRootDataSchema = z
  .object({
    props: z.record(z.string(), z.any()).default({}),
  })
  .optional();

export const formContentSchema: z.ZodType<FormContent> = z
  .looseObject({
    content: z.array(puckComponentDataSchema).optional(),
    root: puckRootDataSchema,
    zones: z.record(z.string(), z.array(puckComponentDataSchema)).optional(),
  })
  .optional() as unknown as z.ZodType<FormContent>;

export type FormContentSchema = z.infer<typeof formContentSchema>;

export const createFormSchema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  content: formContentSchema.default(defaultFormContent),
});

export type CreateFormSchema = z.infer<typeof createFormSchema>;

export const updateFormSchema = z.object({
  formId: z.string().min(1),
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  content: formContentSchema,
});

export type UpdateFormSchema = z.infer<typeof updateFormSchema>;

export const formItemSchema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  content: formContentSchema,
  id: z.string(),
  isPublished: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type FormItemSchema = z.infer<typeof formItemSchema>;

export const formListResponse = z.array(formItemSchema);

export type FormListResponse = z.infer<typeof formListResponse>;
