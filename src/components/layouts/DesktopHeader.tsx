'use client';

import { signOut, useSession } from 'next-auth/react';

import { ThemeToggle } from '../theme/ThemeToggle';
import { Button } from '../ui/button';

type DesktopHeaderProps = {
  title?: string;
  menu?: React.ReactNode;
};

export default function DesktopHeader({ title, menu }: DesktopHeaderProps) {
  const { data } = useSession();

  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0">
          {title ? (
            <h1 className="text-lg font-semibold truncate">{title}</h1>
          ) : null}
        </div>
        <div className="flex items-center gap-4">
          {menu}
          <ThemeToggle />
          {data && <Button onClick={() => signOut()}>Sign out</Button>}
        </div>
      </div>
    </div>
  );
}
