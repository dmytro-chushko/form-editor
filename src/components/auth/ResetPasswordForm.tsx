'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormInputField } from '@/components/form/FormInputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from '@/lib/validation/reset';

type Props = { token: string };

export function ResetPasswordForm({ token }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: '', confirmPassword: '' },
    mode: 'onTouched',
  });

  async function onSubmit(values: ResetPasswordValues) {
    setError(null);
    try {
      const res = await fetch('/api/auth/reset/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Reset failed');
      }
      setSubmitted(true);
    } catch (e: any) {
      setError(e?.message || 'Unexpected error');
    }
  }

  if (submitted) {
    return (
      <p className="text-sm">
        Your password has been reset. You can now{' '}
        <a className="text-blue-600" href="/auth/sign-in">
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
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" className="w-full">
          Reset password
        </Button>
      </form>
    </Form>
  );
}
