'use client';

import { useSearchParams } from 'next/navigation';

import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get('token') || '';

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">Reset password</h1>
      {token ? (
        <ResetPasswordForm token={token} />
      ) : (
        <p className="text-sm text-red-600">Invalid reset link.</p>
      )}
    </main>
  );
}
