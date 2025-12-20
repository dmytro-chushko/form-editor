'use client';

import { Data } from '@measured/puck';
import { notFound, useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Components, RootProps } from '@/features/puck/types';
import { formatErrorMessage } from '@/lib/utils';

import { useGetFormById, useUpdateForm } from '../forms.api';
import {
  FormContent,
  formContentSchema,
  FormContentSchema,
  FormItemSchema,
  UpdateFormSchema,
} from '../forms.schema';

interface UseFormItem {
  currentForm?: FormItemSchema;
  onPublishForm: (data: FormContentSchema) => Promise<void>;
  content: FormContent;
  setContent: (data: FormContentSchema) => void;
  isLoading: boolean;
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
  const { id } = useParams<{ id: string }>();
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

  const onPublishForm = useCallback(
    async (data: FormContentSchema) => {
      if (!id) return;

      const validatedData = formContentSchema.parse(data);

      const payload: UpdateFormSchema = {
        formId: id,
        title: validatedData.root.props?.title,
        description: validatedData.root.props?.description,
        content: validatedData,
      };

      setContent(data);
      await updateForm(payload);
    },
    [id, updateForm]
  );

  return {
    currentForm,
    onPublishForm,
    content,
    setContent,
    isLoading: isUpdateFormPending || isLoadingFormById,
  };
}
