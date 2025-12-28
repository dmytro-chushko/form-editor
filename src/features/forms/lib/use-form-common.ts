import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

import { formatErrorMessage } from '@/lib/utils';

import {
  useCopyForm,
  useDeleteForm,
  useGetSharingLink,
  useTogglePublish,
} from '../forms.api';
import { FormTokenSchema } from '../model/form-token.schema';

interface UseFormCommonProps {
  getSharingLink: (data: FormTokenSchema) => Promise<{
    shareFormLink: string;
    message?: string;
  }>;
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
  const {
    mutateAsync: getSharingLink,
    isPending: isSharingLinkPending,
    isError: isSharingLinkError,
    error: sharingLinkError,
  } = useGetSharingLink();

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

    if (isSharingLinkError && sharingLinkError) {
      toast.error('Error sharing form link', {
        description: formatErrorMessage(
          copyFormError,
          'Faild to get sharing form link'
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
    isSharingLinkError,
    sharingLinkError,
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
    getSharingLink,
    onDelete,
    onTogglePublish,
    onCopy,
    isLoading:
      isDeleteFormPending ||
      isTogglePublishPending ||
      isCopyFormPending ||
      isSharingLinkPending,
  };
}
