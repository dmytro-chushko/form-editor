export const queryKeys = {
  me: ['me'] as const,
  session: ['session'] as const,
  profile: ['profile'] as const,
  forms: ['forms'] as const,
  form: (id: string) => ['form', id] as const,
  sharedForm: (token: string) => ['shared-form', token] as const,
};
