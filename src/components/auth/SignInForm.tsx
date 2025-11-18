'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { FormInputField } from '@/components/form/FormInputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useSignInMutation } from '@/features/auth/api';
import { signInSchema, type SignInValues } from '@/lib/validation/auth';

type Props = {
  onSuccessRedirect?: string;
  showOAuth?: boolean;
};

export function SignInForm({
  onSuccessRedirect = '/',
  showOAuth = true,
}: Props) {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  async function onSubmit(values: SignInValues) {
    mutate(values);
  }

  const { mutate, isPending, error } = useSignInMutation(onSuccessRedirect);

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
            placeholder="Your password"
            type="password"
            autoComplete="current-password"
          />
          <div className="flex justify-end">
            <a className="text-sm text-blue-600" href="/auth/forgot-password">
              Forgot password?
            </a>
          </div>
          {error ? (
            <p className="text-sm text-red-600">{(error as Error).message}</p>
          ) : null}
          <Button type="submit" className="w-full" disabled={isPending}>
            Sign in
          </Button>
        </form>
      </Form>
      {showOAuth ? (
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
      ) : null}
    </>
  );
}
