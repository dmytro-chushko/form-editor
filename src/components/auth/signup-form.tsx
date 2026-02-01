'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useSignUpMutation } from '@/features/auth/api';
import { ROUTES } from '@/lib/constants/routes';
import { signUpSchema, type SignUpValues } from '@/lib/validation/auth';

type Props = { onSuccess?: () => void };

export function SignUpForm({ onSuccess }: Props) {
  const { mutate, isPending, isSuccess, error } = useSignUpMutation();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
    mode: 'onTouched',
  });

  async function onSubmit(values: SignUpValues) {
    const { email, password } = values;
    mutate(
      { email, password },
      {
        onSuccess: () => {
          toast.success('Verification email sent. Check your inbox.');
          onSuccess?.();
        },
        onError: (err) => {
          toast.error((err as Error).message);
        },
      }
    );
  }

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
    }
  }, [error]);

  if (isSuccess) {
    return (
      <div className="space-y-2">
        <p className="text-sm">
          We have sent a confirmation email to your address.
        </p>
        <a className="text-blue-600" href={ROUTES.SignIn}>
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
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Creating...' : 'Sign up'}
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
