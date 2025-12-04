'use client';

import Image from 'next/image';

import AvatarUploader from '@/components/profile/AvatarUploader';
import EditableField from '@/components/profile/EditableField';
import EmailChangeForm from '@/components/profile/EmailChangeForm';
import PasswordChangeForm from '@/components/profile/PasswordChangeForm';
import { useProfileQuery } from '@/features/profile/profile.api';

export default function ProfileCard() {
  const { data, isLoading, error } = useProfileQuery();
  const user = data?.user;

  if (isLoading) {
    return <div className="mt-4 text-sm text-gray-600">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="mt-4 text-sm text-red-600">
        {(error as Error).message || 'Failed to load profile'}
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4 rounded-md border p-4">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-100">
          {user?.image ? (
            <Image
              src={user.image}
              alt="avatar"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
              No avatar
            </div>
          )}
        </div>
        <div>
          <div className="text-base font-medium">{user?.name ?? '—'}</div>
          <div className="text-sm text-gray-600">{user?.email ?? '—'}</div>
        </div>
        <AvatarUploader />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <EditableField
          label="First name"
          field="firstName"
          value={user?.firstName ?? ''}
        />
        <EditableField
          label="Last name"
          field="lastName"
          value={user?.lastName ?? ''}
        />
      </div>

      <PasswordChangeForm />
      <EmailChangeForm />
    </div>
  );
}
