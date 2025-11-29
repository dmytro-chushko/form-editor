import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { ROUTES } from '@/lib/constants/routes';

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect(ROUTES.SignIn);
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="mt-2 text-gray-600">
        Profile of {session.user?.email ?? 'user'}.
      </p>
    </div>
  );
}
