import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useFormCommon } from '@/features/forms/lib/use-form-common';
import {
  SendFormSchema,
  sendFormSchema,
} from '@/features/forms/model/forms.schema';

import { useModal } from './use-modal';

const SEND_FORM_MODAL_NAME = 'send-form';

export function useSendFormModal() {
  const [sharingLink, setSharingLink] = useState('');
  const { isOpen, close, payload } = useModal(SEND_FORM_MODAL_NAME);
  const { getSharingLink, isLoading } = useFormCommon();
  const form = useForm<SendFormSchema>({
    resolver: zodResolver(sendFormSchema),
    defaultValues: {
      userEmail: '',
    },
  });

  const onSubmitEmail = async (data: SendFormSchema) => {
    if (payload?.formId) {
      const response = await getSharingLink({
        ...data,
        formId: payload.formId,
      });

      if (response.message) {
        handleClose();

        return;
      }

      if (response.shareFormLink) setSharingLink(response.shareFormLink);

      return;
    }

    toast.error('Error sharing form link', {
      description: 'Form id is not provided',
    });
  };

  const handleClose = () => {
    form.reset({ userEmail: '', expiresAt: Date.now() });
    setSharingLink('');
    close(SEND_FORM_MODAL_NAME);
  };

  return {
    form,
    sharingLink,
    isOpen,
    isLoading,
    onSubmitEmail,
    handleClose,
  };
}
