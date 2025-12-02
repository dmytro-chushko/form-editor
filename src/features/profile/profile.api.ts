import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiGet, apiPost } from '@/lib/api/apiClient';
import { queryKeys as qk } from '@/lib/api/queryKeys';

import type {
  AvatarUpdateInput,
  ChangePasswordInput,
  ProfileResponse,
  RequestEmailChangeInput,
  UpdateNameInput,
} from './profile.schema';

export function useProfileQuery() {
  return useQuery({
    queryKey: qk.profile(),
    queryFn: () => apiGet<ProfileResponse>('/api/profile'),
  });
}

export function useUpdateNameMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateNameInput) =>
      fetch('/api/profile/name', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(async (r) => {
        if (!r.ok) {
          let message = 'Request failed';
          try {
            const j = await r.json();
            message = j?.error || message;
          } catch {}
          throw new Error(message);
        }

        return r.json();
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.profile() });
      qc.invalidateQueries({ queryKey: qk.me() });
    },
  });
}

export function useAvatarUploadUrlMutation() {
  return useMutation({
    mutationFn: (data: { filename: string; contentType: string }) =>
      apiPost<{ uploadUrl: string; objectPath: string; url?: string }>(
        '/api/profile/avatar/upload-url',
        data
      ),
  });
}

export function useUpdateAvatarMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: AvatarUpdateInput) =>
      fetch('/api/profile/avatar', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(async (r) => {
        if (!r.ok) {
          let message = 'Request failed';
          try {
            const j = await r.json();
            message = j?.error || message;
          } catch {}
          throw new Error(message);
        }

        return r.json();
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.profile() });
      qc.invalidateQueries({ queryKey: qk.me() });
    },
  });
}

export function useRequestEmailChangeMutation() {
  return useMutation({
    mutationFn: (data: RequestEmailChangeInput) =>
      apiPost<{ ok: true }>('/api/profile/email/request', data),
  });
}

export function useConfirmEmailChangeQuery(token: string | null) {
  return useQuery({
    queryKey: ['profile', 'email-confirm', token],
    queryFn: () =>
      apiGet<{ ok: true }>(
        `/api/profile/email/confirm?token=${encodeURIComponent(token || '')}`
      ),
    enabled: !!token,
  });
}

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: (data: ChangePasswordInput) =>
      apiPost<{ ok: true }>('/api/profile/password', data),
  });
}
