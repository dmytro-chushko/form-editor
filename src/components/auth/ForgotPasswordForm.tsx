'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FormInputField } from '@/components/form/FormInputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForgotPasswordMutation } from '@/features/auth/api';
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from '@/lib/validation/reset';

export function ForgotPasswordForm() {
  const { mutate, isPending, isSuccess, error } = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onTouched',
  });

  async function onSubmit(values: ForgotPasswordValues) {
    mutate(values);
  }

  if (isSuccess) {
    return (
      <p className="text-sm">
        If the email exists, we have sent a password reset link.
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormInputField
          name="email"
          label="Email"
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
        />
        {error ? (
          <p className="text-sm text-red-600">{(error as Error).message}</p>
        ) : null}
        <Button type="submit" className="w-full" disabled={isPending}>
          Send reset link
        </Button>
      </form>
    </Form>
  );
}
