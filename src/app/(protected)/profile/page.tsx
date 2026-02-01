import ProfileCard from '@/components/profile/profile-card';
import { auth } from '@/lib/auth';

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="mt-2 text-gray-600">
        Profile of {session?.user?.email ?? 'user'}.
      </p>
      <ProfileCard />
    </div>
  );
}
