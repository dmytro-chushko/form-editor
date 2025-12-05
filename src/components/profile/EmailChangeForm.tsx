'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useRouter } from 'next/navigation';
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
import { useRequestEmailChangeMutation } from '@/features/profile/profile.api';
import {
  requestEmailChangeSchema,
  type RequestEmailChangeInput,
} from '@/features/profile/profile.schema';

export default function EmailChangeForm() {
  const form = useForm<RequestEmailChangeInput>({
    resolver: zodResolver(requestEmailChangeSchema),
    defaultValues: { newEmail: '' },
    mode: 'onBlur',
  });

  const { mutateAsync, isPending } = useRequestEmailChangeMutation();
  const router = useRouter();
  const params = useSearchParams();

  async function onSubmit(values: RequestEmailChangeInput) {
    try {
      await mutateAsync(values);
      toast.success("We've sent a confirmation link to your new email");
      form.reset();
    } catch (e: any) {
      toast.error(e?.message || 'Failed to request email change');
    }
  }

  // React to server-side redirect flags after user clicks email confirmation link
  useEffect(() => {
    const status = params.get('emailChanged');

    if (!status) return;

    if (status === '1') {
      toast.success('Email successfully changed');
    } else if (status === 'conflict') {
      toast.error('This email is already in use');
    } else if (status === '0') {
      toast.error('Invalid or expired confirmation link');
    }

    const url = new URL(window.location.href);
    url.searchParams.delete('emailChanged');
    router.replace(
      url.pathname + (url.search ? `?${url.searchParams.toString()}` : ''),
      { scroll: false }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div className="mt-6 rounded-md border p-4">
      <h2 className="mb-3 text-lg font-semibold">Change e‑mail</h2>
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
