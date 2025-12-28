'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LinkIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInputField } from '@/components/form/FormInputField';
import { Button } from '@/components/ui/button';
import { DateWithTime } from '@/components/ui/date-with-time';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useFormCommon } from '@/features/forms/lib/use-form-common';
import {
  sendFormSchema,
  SendFormSchema,
} from '@/features/forms/model/forms.schema';
import { copyToClipboard } from '@/lib/utils';

import { useModal } from '../lib/use-modal';

const SEND_FORM_MODAL_NAME = 'send-form';

export function SendFormModal() {
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
        toast.success(response.message);
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="space-y-6">
        <DialogHeader>
          <DialogTitle>Send Form</DialogTitle>
        </DialogHeader>

        {sharingLink ? (
          <Field orientation="horizontal" className="min-w-0">
            <p className="truncate min-w-0 flex-1">{sharingLink}</p>
            <Button
              type="button"
              size="icon-lg"
              onClick={() => copyToClipboard(sharingLink)}
            >
              <LinkIcon size={32} className="size-6" />
            </Button>
          </Field>
        ) : (
          <div className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitEmail)}
                className="space-y-6"
              >
                <Controller
                  name="expiresAt"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="date-picker" className="px-1">
                        Set Expiration Date
                      </Label>
                      <DateWithTime
                        timeValue={field.value}
                        onTimeChange={field.onChange}
                      />
                    </div>
                  )}
                />
                <FormInputField
                  name="userEmail"
                  label="User Email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={!!sharingLink}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {form.getValues('userEmail') ? 'Send Link' : 'Generate Link'}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
