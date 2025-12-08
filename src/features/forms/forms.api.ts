import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiPost } from '@/lib/api/apiClient';
import { queryKeys as qk } from '@/lib/api/queryKeys';

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
