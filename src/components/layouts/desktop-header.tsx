'use client';

import { SignOutIcon } from '@phosphor-icons/react';
import { UserCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import { ROUTES } from '@/lib/constants/routes';

import { ThemeToggle } from '../theme/theme-toggle';
import { Button } from '../ui/button';

type DesktopHeaderProps = {
  title?: string;
  menu?: React.ReactNode;
};

export default function DesktopHeader({ title, menu }: DesktopHeaderProps) {
  const { data } = useSession();
  const router = useRouter();

  return (
    <div className=" bg-background/80 backdrop-blur border-b">
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0">
          {title ? (
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                router.push('/');
              }}
            >
              <h1 className="text-lg font-semibold truncate">{title}</h1>
            </Link>
          ) : null}
        </div>
        <div className="flex items-center gap-4">
          {menu}
          <ThemeToggle />
          {data && (
            <div className="flex gap-2">
              <Button size="icon" aria-label="profile-page" asChild>
                <Link href={ROUTES.Profile}>
                  <UserCircleIcon size={32} />
                </Link>
              </Button>
              <Button onClick={() => signOut()}>
                <SignOutIcon size={32} />
                Sign out
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
