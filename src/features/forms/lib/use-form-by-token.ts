'use client';

import { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { formatErrorMessage, stripFileFields } from '@/lib/utils';

import {
  useGetFormByToken,
  useGetFormProgressByToken,
  useSaveFormProgress,
} from '../forms.api';

export function useFormByToken() {
  const {
    data: sharedForm,
    isLoading: isFormLoading,
    isError: isFormError,
    error: formError,
  } = useGetFormByToken();
  const form = useForm();
  const email = useWatch({ control: form.control, name: 'recepientEmail' });
  const {
    data: formProgress,
    isLoading: isProgressLoading,
    isError: isProgressError,
    error: progressError,
  } = useGetFormProgressByToken(email);
  const {
    mutateAsync: saveProgress,
    isPending,
    isError: isSaveProgressError,
    error: saveProgressError,
  } = useSaveFormProgress();

  const onSaveProgress = useCallback(async () => {
    if (!email) return;
    const content = stripFileFields(form.getValues());
    await saveProgress({
      userEmail: email,
      content,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (formProgress) {
      form.reset(
        { recepientEmail: email, ...formProgress.content },
        { keepDirtyValues: true, keepTouched: true }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formProgress]);

  useEffect(() => {
    if (isFormError && formError) {
      toast.error('Error loading form', {
        description: formatErrorMessage(formError, 'Faild to load form'),
      });
    }

    if (isProgressError && progressError) {
      toast.error('Error loading form progress', {
        description: formatErrorMessage(
          formError,
          'Faild to load form progress'
        ),
      });
    }

    if (isSaveProgressError && saveProgressError) {
      toast.error('Error save form progress', {
        description: formatErrorMessage(
          formError,
          'Faild to save form progress'
        ),
      });
    }
  }, [
    isFormError,
    formError,
    isProgressError,
    progressError,
    isSaveProgressError,
    saveProgressError,
  ]);

  return {
    email,
    form,
    sharedForm,
    formProgress,
    onSaveProgress,
    isLoading: isFormLoading || isProgressLoading || isPending,
    isFormError,
    formError,
  };
}
