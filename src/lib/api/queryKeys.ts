export const queryKeys = {
  me: ['me'] as const,
  session: ['session'] as const,
  profile: ['profile'] as const,
  forms: (
    page?: number,
    pageSize?: number,
    title?: string,
    from?: string,
    to?: string
  ) =>
    [
      'forms',
      { page, pageSize, title: title ?? '', from: from ?? '', to: to ?? '' },
    ] as const,
  form: (id: string) => ['form', id] as const,
  formProgress: (token: string) => ['form-progress', token] as const,
  sharedForm: (token: string) => ['shared-form', token] as const,
  overview: (
    page: number,
    pageSize: number,
    title?: string,
    from?: string,
    to?: string
  ) =>
    [
      'results',
      'overview',
      { page, pageSize, title: title ?? '', from: from ?? '', to: to ?? '' },
    ] as const,
  formResults: (formId: string, params: Record<string, unknown>) =>
    ['results', 'form', formId, params] as const,
};
