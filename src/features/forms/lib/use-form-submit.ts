'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

import { formatErrorMessage } from '@/lib/utils';

import { useSubmitSharedForm } from '../forms.api';
import { submittedFormPayloadSchema } from '../model/forms.schema';

import { useAddFile } from './use-upload-file';

export function useFormSubmit() {
  const router = useRouter();
  const { uploadFile, isFileUploading } = useAddFile();
  const {
    mutateAsync: submitForm,
    isPending,
    isError,
    error,
  } = useSubmitSharedForm();

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      let formPayload = data;
      const fileKye = Object.keys(data).find(
        (item) => data[item] instanceof File
      );

      if (fileKye) {
        const fileUrl = await uploadFile(data[fileKye]);

        if (!fileUrl) return;

        formPayload = { ...formPayload, [fileKye]: fileUrl };
      }

      const { recepientEmail, ...restOfPayload } = formPayload;

      try {
        submittedFormPayloadSchema.parse({
          userEmail: recepientEmail,
          content: restOfPayload,
        });
      } catch (err) {
        toast.error('Validation Error', {
          description: formatErrorMessage(err, 'Invalid Payload'),
        });
      }

      const res = await submitForm({
        userEmail: recepientEmail,
        content: restOfPayload,
      });

      if (res.ok) router.replace('/shared-form/confirm', {});
    },
    [router, submitForm, uploadFile]
  );

  useEffect(() => {
    if (isError && error) {
      toast.error('Error submitting form', {
        description: formatErrorMessage(error, 'Faild to submit form'),
      });
    }
  }, [error, isError]);

  return {
    onSubmit,
    isSubmitting: isFileUploading || isPending,
  };
}
