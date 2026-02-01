import { redirect } from 'next/navigation';

import { SignUpForm } from '@/components/auth/signup-form';
import { auth } from '@/lib/auth';
import { ROUTES } from '@/lib/constants/routes';

export default async function SignUpPage() {
  const session = await auth();

  if (session?.user) {
    redirect(ROUTES.Dashboard);
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Create an account</h1>
      <div className="mt-4">
        <SignUpForm />
      </div>
      <p className="mt-3 text-sm text-gray-600">
        Already have an account?{' '}
        <a className="text-blue-600" href={ROUTES.SignIn}>
          Sign in
        </a>
      </p>
    </main>
  );
}
