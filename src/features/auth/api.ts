import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

import { apiGet, apiPost } from '@/lib/apiClient';
import { queryKeys as qk } from '@/lib/queryKeys';

export function useSignInMutation(onSuccessRedirect = '/') {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      await signIn('credentials', { ...data, callbackUrl: onSuccessRedirect });

      return true;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.me() });
    },
  });
}

export function useSignUpMutation() {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      apiPost('/api/auth/signup', data),
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (data: { email: string }) =>
      apiPost('/api/auth/reset/request', data),
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (data: {
      token: string;
      password: string;
      confirmPassword: string;
    }) => apiPost('/api/auth/reset/confirm', data),
  });
}

export function useMeQuery() {
  return useQuery({
    queryKey: qk.me(),
    queryFn: () =>
      apiGet<{ user: { id: string; email: string | null } | null }>('/api/me'),
  });
}
