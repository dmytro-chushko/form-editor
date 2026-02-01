'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useResetPasswordMutation } from '@/features/auth/api';
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from '@/lib/validation/reset';

type Props = { token: string };

export function ResetPasswordForm({ token }: Props) {
  const { mutate, isPending, isSuccess, error } = useResetPasswordMutation();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: '', confirmPassword: '' },
    mode: 'onTouched',
  });

  async function onSubmit(values: ResetPasswordValues) {
    mutate(values, {
      onSuccess: () => {
        toast.success('Password reset successfully. You can now sign in.');
      },
      onError: (err) => {
        toast.error((err as Error).message);
      },
    });
  }

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
    }
  }, [error]);

  if (isSuccess) {
    return (
      <p className="text-sm">
        Your password has been reset. You can now{' '}
        <a className="text-blue-600" href="/sign-in">
          sign in
        </a>
        .
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormInputField
          name="password"
          label="New password"
          placeholder="At least 8 characters"
          type="password"
          autoComplete="new-password"
        />
        <FormInputField
          name="confirmPassword"
          label="Confirm password"
          placeholder="Re-enter your password"
          type="password"
          autoComplete="new-password"
        />
        {error ? (
          <p className="text-sm text-red-600">{(error as Error).message}</p>
        ) : null}
        <Button type="submit" className="w-full" disabled={isPending}>
          Reset password
        </Button>
      </form>
    </Form>
  );
}
