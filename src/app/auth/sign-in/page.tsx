'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { SignInForm } from '@/components/auth/SignInForm';

export default function SignInPage() {
  const { data } = useSession();
  const router = useRouter();

  if (data) {
    router.push('/dashboard');
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">Sign in</h1>
      <SignInForm onSuccessRedirect="/dashboard" />
      <p className="mt-3 text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <a className="text-blue-600" href="/auth/sign-up">
          Sign up
        </a>
      </p>
    </main>
  );
}
