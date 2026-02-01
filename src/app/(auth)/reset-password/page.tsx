import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { token = '' } = await searchParams;

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">Reset password</h1>
      {token && typeof token === 'string' ? (
        <ResetPasswordForm token={token} />
      ) : (
        <p className="text-sm text-red-600">Invalid reset link.</p>
      )}
    </main>
  );
}
