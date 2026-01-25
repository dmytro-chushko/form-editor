'use client';

import Image from 'next/image';
import { Suspense } from 'react';

import AvatarUploader from '@/components/profile/AvatarUploader';
import EditableField from '@/components/profile/EditableField';
import EmailChangeForm from '@/components/profile/EmailChangeForm';
import PasswordChangeForm from '@/components/profile/PasswordChangeForm';
import { useProfileQuery } from '@/features/profile/profile.api';

import {
  EmailChangeFormSkeleton,
  ProfileCardSkeleton,
} from '../ui/app-skeletons';

export default function ProfileCard() {
  const { data, isLoading, error } = useProfileQuery();
  const user = data?.user;

  if (isLoading) {
    return <ProfileCardSkeleton />;
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
      <div>
        <div className="flex items-center gap-4 flex-wrap max-sm:flex-col max-sm:items-center">
          <div className="shrink-0">
            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-100 ">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="avatar"
                  fill
                  className="object-covers"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                  No avatar
                </div>
              )}
            </div>
            <AvatarUploader />
          </div>

          <div className="max-sm:text-center">
            {/* <div className="text-base font-medium">
              {user?.firstName
                ? `${user?.firstName} ${user?.lastName}`
                : `${user?.lastName || '-'}`}
            </div> */}
            <div className="text-sm text-gray-600">{user?.email ?? '—'}</div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
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
      <Suspense fallback={<EmailChangeFormSkeleton />}>
        <EmailChangeForm />
      </Suspense>
    </div>
  );
}
