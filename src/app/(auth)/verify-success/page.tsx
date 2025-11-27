import { ROUTES } from '@/lib/constants/routes';

export default function VerifySuccessPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Email verified</h1>
      <p className="mt-2 text-gray-600">You can now sign in to your account.</p>
      <a className="mt-4 inline-block text-blue-600" href={ROUTES.SignIn}>
        Sign in
      </a>
    </main>
  );
}
