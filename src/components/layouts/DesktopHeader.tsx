'use client';

import { UserCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import { ThemeToggle } from '../theme/ThemeToggle';
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
            <h1 className="text-lg font-semibold truncate">{title}</h1>
          ) : null}
        </div>
        <div className="flex items-center gap-4">
          {menu}
          <ThemeToggle />
          {data && (
            <div className="flex gap-2">
              <Button size="icon" onClick={() => router.push('/profile')}>
                <UserCircleIcon size={32} />
              </Button>
              <Button onClick={() => signOut()}>Sign out</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
