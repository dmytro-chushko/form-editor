import { useMutation } from '@tanstack/react-query';

import { apiPost } from '@/lib/api/apiClient';

export function useSignInMutation(onSuccessRedirect = '/') {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      await apiPost('/api/auth/credentials/login', data);

      return onSuccessRedirect;
    },
    onSuccess: (url) => {
      if (url) window.location.assign(url);
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
