import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { apiGet, apiPatch, apiPost } from '@/lib/api/apiClient';
import { queryKeys as qk } from '@/lib/api/queryKeys';

import { FormListResponse } from './forms.schema';

export function useCreateForm() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data?: { title?: string; description?: string }) =>
      apiPost<{ id: string }>('api/forms', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.forms() });
    },
  });
}

export function useGetFormList() {
  return useQuery({
    queryKey: qk.forms(),
    queryFn: () => apiGet<FormListResponse[]>('api/forms'),
    placeholderData: keepPreviousData,
  });
}

export function useUpdateForm() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string }) =>
      apiPatch<FormListResponse>('api/forms', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.forms() });
    },
  });
}
