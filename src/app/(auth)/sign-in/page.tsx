import { redirect } from 'next/navigation';

import { SignInForm } from '@/components/auth/signIn-form';
import { auth } from '@/lib/auth';
import { ROUTES } from '@/lib/constants/routes';

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect(ROUTES.Dashboard);
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">Sign in</h1>
      <SignInForm onSuccessRedirect={ROUTES.Dashboard} />
      <p className="mt-3 text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <a className="text-blue-600" href={ROUTES.SignUp}>
          Sign up
        </a>
      </p>
    </div>
  );
}
