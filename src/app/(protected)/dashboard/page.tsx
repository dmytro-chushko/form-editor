import { FormList } from '@/components/dashboard/form-list/form-list';
import { auth } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="container mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Form List</h1>
      <p className="text-gray-600">
        Welcome the dashboard, {session?.user?.email ?? 'user'}.
      </p>
      <FormList />
    </div>
  );
}
