'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  useConfirmEmailChangeQuery,
  useRequestEmailChangeMutation,
} from '@/features/profile/profile.api';
import {
  requestEmailChangeSchema,
  type RequestEmailChangeInput,
} from '@/features/profile/profile.schema';

export default function EmailChangeForm() {
  const form = useForm<RequestEmailChangeInput>({
    resolver: zodResolver(requestEmailChangeSchema),
    defaultValues: { newEmail: '' },
    mode: 'onSubmit',
  });

  const { mutateAsync, isPending } = useRequestEmailChangeMutation();

  async function onSubmit(values: RequestEmailChangeInput) {
    try {
      await mutateAsync(values);
      toast.success('We sent a confirmation link to your new email');
      form.reset();
    } catch (e: any) {
      toast.error(e?.message || 'Failed to request email change');
    }
  }

  // confirm by token in query (after user clicks email link)
  const params = useSearchParams();
  const token = params.get('emailChangeToken');
  const confirm = useConfirmEmailChangeQuery(token);
  useEffect(() => {
    if (confirm.isSuccess && token) {
      toast.success('Email changed successfully');
    } else if (confirm.isError && token) {
      toast.error('Email change failed');
    }
  }, [confirm.isSuccess, confirm.isError, token]);

  return (
    <div className="mt-6 rounded-md border p-4">
      <h2 className="mb-3 text-base font-medium">Change e‑mail</h2>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.new@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Sending…' : 'Request change'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
