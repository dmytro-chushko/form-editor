'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormInputField } from '@/components/form/FormInputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { signUpSchema, type SignUpValues } from '@/lib/validation/auth';

type Props = { onSuccess?: () => void };

export function SignUpForm({ onSuccess }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  async function onSubmit(values: SignUpValues) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Sign up failed');
      }
      setSuccess(true);
      onSuccess?.();
    } catch (e: any) {
      setError(e?.message || 'Unexpected error');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="space-y-2">
        <p className="text-sm">
          We have sent a confirmation email to your address.
        </p>
        <a className="text-blue-600" href="/auth/sign-in">
          Back to sign in
        </a>
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInputField
            name="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
          />
          <FormInputField
            name="password"
            label="Password"
            placeholder="At least 8 characters"
            type="password"
            autoComplete="new-password"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Creating...' : 'Sign up'}
          </Button>
        </form>
      </Form>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          onClick={() => signIn('google')}
          type="button"
        >
          Google
        </Button>
        <Button
          variant="outline"
          onClick={() => signIn('github')}
          type="button"
        >
          GitHub
        </Button>
      </div>
    </>
  );
}
