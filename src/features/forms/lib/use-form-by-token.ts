import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { formatErrorMessage } from '@/lib/utils';

import { useGetFormByToken } from '../forms.api';

export function useFormByToken() {
  const { data: sharedForm, isLoading, isError, error } = useGetFormByToken();
  const form = useForm();

  useEffect(() => {
    if (isError && error) {
      toast.error('Error loading form', {
        description: formatErrorMessage(error, 'Faild to load form'),
      });
    }
  }, [error, isError]);

  return {
    form,
    sharedForm,
    isLoading,
    isError,
    error,
  };
}
