'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

import { useGetFormList } from './forms.api';

export function useGetForms() {
  const { data, isError, error } = useGetFormList();

  useEffect(() => {
    if (isError && error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Faild to load forms';
      toast.error('Error loading forms', { description: errorMessage });
    }
  }, [isError, error]);

  return { formList: data };
}
