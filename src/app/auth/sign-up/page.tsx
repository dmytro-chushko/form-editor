'use client';
import { SignUpForm } from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Create an account</h1>
      <div className="mt-4">
        <SignUpForm />
      </div>
      <p className="mt-3 text-sm text-gray-600">
        Already have an account?{' '}
        <a className="text-blue-600" href="/auth/sign-in">
          Sign in
        </a>
      </p>
    </main>
  );
}
