'use client';

import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { formatErrorMessage } from '@/lib/utils';

import { useGetFormList, useUpdateForm } from '../forms.api';
import { UpdateFormSchema } from '../forms.schema';

export function useApiForms() {
  const { id } = useParams();
  const [content, setContent] = useState({});
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

  const onPublishForm = useCallback(
    async (updateParams: UpdateFormSchema) => {
      setContent(updateParams.content);
      await updateForm(updateParams);
    },
    [updateForm]
  );

  return {
    formList: data,
    updateForm,
    onPublishForm,
    content,
    isLoading: isLoadingFormList || isUpdateFormPending,
  };
}
