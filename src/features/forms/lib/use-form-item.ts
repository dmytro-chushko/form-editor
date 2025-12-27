'use client';

import { Data } from '@measured/puck';
import { notFound } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ZodError } from 'zod';

import { Components, RootProps } from '@/features/puck/types';
import { formatErrorMessage } from '@/lib/utils';

import { useGetFormById, useUpdateForm } from '../forms.api';
import {
  FormContent,
  formContentSchema,
  FormContentSchema,
  FormItemSchema,
  UpdateFormSchema,
} from '../model/forms.schema';

interface UseFormItem {
  currentForm?: FormItemSchema;
  onSaveForm: (data: FormContentSchema) => Promise<void>;
  content: FormContent;
  setContent: (data: FormContentSchema) => void;
  isUpdateFormPending: boolean;
  isFormProcessing: boolean;
}

const initialContent: Data<Components, RootProps> = {
  content: [],
  root: {
    props: {
      title: 'Form Title',
      description: 'Form Description',
    },
  },
};

export function useFormItem(): UseFormItem {
  const [content, setContent] = useState<FormContent>(initialContent);

  const {
    data: currentForm,
    isError: isErrorGetFormById,
    error: errorGetFormById,
    isLoading: isLoadingFormById,
  } = useGetFormById();
  const {
    mutateAsync: updateForm,
    isPending: isUpdateFormPending,
    isError: isUpdateFormError,
    error: updateFormError,
  } = useUpdateForm();

  useEffect(() => {
    if (currentForm) setContent(currentForm.content);
  }, [currentForm]);

  useEffect(() => {
    if (isErrorGetFormById && errorGetFormById) {
      toast.error('Error loading form', {
        description: formatErrorMessage(errorGetFormById, 'Faild to load form'),
      });

      notFound();
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
    isUpdateFormError,
    updateFormError,
    isErrorGetFormById,
    errorGetFormById,
  ]);

  const onSaveForm = useCallback(
    async (data: FormContentSchema) => {
      let validatedData = data;
      try {
        validatedData = formContentSchema.parse(data);
      } catch (e: unknown) {
        toast.error(
          `Ivalid form content ${
            e instanceof ZodError
              ? e.issues.map(({ message }) => message).join(', ')
              : ''
          }`
        );
      }

      const payload: UpdateFormSchema = {
        title: validatedData.root.props?.title,
        description: validatedData.root.props?.description,
        content: validatedData,
      };

      setContent(data);
      await updateForm(payload);
    },
    [updateForm]
  );

  return {
    currentForm,
    onSaveForm,
    content,
    setContent,
    isUpdateFormPending,
    isFormProcessing: isLoadingFormById,
  };
}
