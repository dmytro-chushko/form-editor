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

export default function EmailChangeField({
  currentEmail,
}: {
  currentEmail: string | null | undefined;
}) {
  const form = useForm<RequestEmailChangeInput>({
    resolver: zodResolver(requestEmailChangeSchema),
    defaultValues: { newEmail: '' },
    mode: 'onSubmit',
  });

  const { mutateAsync, isPending } = useRequestEmailChangeMutation();

  async function onSubmit(values: RequestEmailChangeInput) {
    try {
      await mutateAsync(values);
      toast.success('Check your inbox to confirm email change');
      form.reset();
    } catch (e: any) {
      toast.error(e?.message || 'Failed to request email change');
    }
  }

  // consume confirm result via query param
  const params = useSearchParams();
  const token = params.get('token');
  const { data: confirmData, isFetched } = useConfirmEmailChangeQuery(token);
  useEffect(() => {
    if (!token) return;

    if (isFetched) {
      if (confirmData?.ok) toast.success('Email updated');
      else toast.error('Email change link is invalid or expired');
    }
  }, [token, isFetched, confirmData]);

  return (
    <div className="mt-6 rounded-md border p-4">
      <h2 className="mb-3 text-base font-medium">Email</h2>
      <div className="mb-2 text-sm text-gray-600">
        Current: {currentEmail ?? '—'}
      </div>
      <Form {...form}>
        <form
          className="flex items-start gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input type="email" placeholder="New email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Sending…' : 'Request change'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
