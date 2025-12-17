'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

import { formatErrorMessage } from '@/lib/utils';

import { useGetFormList, useUpdateForm } from '../forms.api';

export function useFormsApi() {
  const {
    data,
    isError: isErrorGetFormLIst,
    error: errorGetFormList,
    isLoading: isLoadingFormList,
  } = useGetFormList();
  const {
    mutateAsync: updateForm,
    isPending: isUpdateFormPending,
    isError: isUpdateFormError,
    error: updateFormError,
  } = useUpdateForm();

  useEffect(() => {
    if (isErrorGetFormLIst && errorGetFormList) {
      toast.error('Error loading forms', {
        description: formatErrorMessage(
          errorGetFormList,
          'Faild to load forms'
        ),
      });
    }

    if (isUpdateFormError && updateFormError) {
      toast.error('Error update form', {
        description: formatErrorMessage(
          updateFormError,
          'Faild to update form'
        ),
      });
    }
  }, [
    isErrorGetFormLIst,
    errorGetFormList,
    isUpdateFormError,
    updateFormError,
  ]);

  return {
    formList: data,
    updateForm,
    isLoading: isLoadingFormList || isUpdateFormPending,
  };
}
