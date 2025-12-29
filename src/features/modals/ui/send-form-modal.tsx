'use client';

import { LinkIcon } from '@phosphor-icons/react';
import { Controller } from 'react-hook-form';

import { FormInputField } from '@/components/form/FormInputField';
import { Button } from '@/components/ui/button';
import { DateWithTime } from '@/components/ui/date-with-time';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { copyToClipboard } from '@/lib/utils';

import { useSendFormModal } from '../lib/use-send-form-modal';

export function SendFormModal() {
  const { form, sharingLink, isOpen, isLoading, onSubmitEmail, handleClose } =
    useSendFormModal();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="space-y-6" aria-describedby="send form modal">
        <DialogHeader>
          <DialogTitle>Send Form</DialogTitle>
        </DialogHeader>

        {sharingLink ? (
          <Field orientation="horizontal" className="min-w-0">
            <p className="truncate min-w-0 flex-1 border border-muted-foreground p-2 rounded-md">
              {sharingLink}
            </p>
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
                      <Label htmlFor="date-picker" className="px-1 text-lg">
                        Set Expiration Date
                      </Label>
                      <DateWithTime
                        timeValue={field.value}
                        onTimeChange={field.onChange}
                      />
                    </div>
                  )}
                />
                <DialogDescription className="px-1 text-lg">
                  Enter the recipient&apos;s email address if you want to send
                  the link directly through this modal window, or generate a
                  link using button below.
                </DialogDescription>
                <FormInputField
                  name="userEmail"
                  label="Recipient Email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={!!sharingLink}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {form.watch('userEmail') ? 'Send Link' : 'Generate Link'}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
