import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { ROUTES } from '@/lib/constants/routes';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect(ROUTES.SignIn);
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Welcome the dashboard, {session.user?.email ?? 'user'}.
      </p>
    </main>
  );
}
