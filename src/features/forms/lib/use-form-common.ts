import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

import { formatErrorMessage } from '@/lib/utils';

import { useCopyForm, useDeleteForm, useTogglePublish } from '../forms.api';

interface UseFormCommonProps {
  onDelete: (id: string) => Promise<void>;
  onTogglePublish: (id: string, isPublished: boolean) => Promise<void>;
  onCopy: (id: string) => Promise<void>;
  isLoading: boolean;
}

export function useFormCommon(): UseFormCommonProps {
  const {
    mutateAsync: deleteForm,
    isPending: isDeleteFormPending,
    isError: isDeleteFormError,
    error: deleteFormError,
  } = useDeleteForm();
  const {
    mutateAsync: togglePublish,
    isPending: isTogglePublishPending,
    isError: isTogglePublishError,
    error: togglePublishError,
  } = useTogglePublish();
  const {
    mutateAsync: copyForm,
    isPending: isCopyFormPending,
    isError: isCopyFormError,
    error: copyFormError,
  } = useCopyForm();

  useEffect(() => {
    if (isDeleteFormError && deleteFormError) {
      toast.error('Error deleting form', {
        description: formatErrorMessage(
          deleteFormError,
          'Faild to delete form'
        ),
      });
    }

    if (isTogglePublishError && togglePublishError) {
      toast.error('Error publish toggling form', {
        description: formatErrorMessage(
          togglePublishError,
          'Faild to toggle publish form'
        ),
      });
    }

    if (isCopyFormError && copyFormError) {
      toast.error('Error publish toggling form', {
        description: formatErrorMessage(
          copyFormError,
          'Faild to toggle publish form'
        ),
      });
    }
  }, [
    isDeleteFormError,
    deleteFormError,
    isTogglePublishError,
    togglePublishError,
    isCopyFormError,
    copyFormError,
  ]);

  const onDelete = useCallback(
    async (id: string) => {
      await deleteForm(id);
    },
    [deleteForm]
  );

  const onTogglePublish = useCallback(
    async (id: string, isPublished: boolean) => {
      try {
        await togglePublish({ isPublished, formId: id });
        toast.success(isPublished ? 'Form published' : 'Form unpublished');
      } catch {}
    },
    [togglePublish]
  );

  const onCopy = useCallback(
    async (id: string) => {
      await copyForm(id);
    },
    [copyForm]
  );

  return {
    onDelete,
    onTogglePublish,
    onCopy,
    isLoading:
      isDeleteFormPending || isTogglePublishPending || isCopyFormPending,
  };
}
