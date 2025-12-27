'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FormInputField } from '@/components/form/FormInputField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import {
  sendFormSchema,
  SendFormSchema,
} from '@/features/forms/model/forms.schema';

import { useModal } from '../lib/use-modal';

const SEND_FORM_MODAL_NAME = 'send-form';

export function SendFormModal() {
  const { isOpen, close, payload } = useModal(SEND_FORM_MODAL_NAME);
  const form = useForm<SendFormSchema>({
    resolver: zodResolver(sendFormSchema),
  });

  const onSubmitEmail = (data: SendFormSchema) => console.warn(data);

  return (
    <Dialog open={isOpen} onOpenChange={() => close(SEND_FORM_MODAL_NAME)}>
      <DialogContent className="space-y-6">
        <DialogHeader>
          <DialogTitle>Send Form</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitEmail)}
              className="space-y-6"
            >
              <FormInputField
                name="userEmail"
                label="User Email"
                placeholder="you@example.com"
                autoComplete="email"
              />
              <Button type="submit" disabled={false} className="w-full">
                Send Link
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
