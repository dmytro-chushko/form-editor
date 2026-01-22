'use client';

import { SignOutIcon } from '@phosphor-icons/react';
import { UserCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { navItems } from '../app-sidebar/model/nav';
import { ThemeToggle } from '../theme/ThemeToggle';

type MobileHeaderLayoutProps = {
  title?: string;
  menu?: React.ReactNode;
};

export default function MobileHeaderLayout({
  title,
  menu,
}: MobileHeaderLayoutProps) {
  const [open, setOpen] = useState(false);
  const { data } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;

    if (open) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }

    return () => body.classList.remove('overflow-hidden');
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="relative">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="min-w-0">
            {title ? (
              <h1 className="text-base font-semibold truncate">{title}</h1>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? 'Close' : 'Menu'}
            </Button>
          </div>
        </div>
      </div>
      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between h-14 px-4 border-b">
            <div className="flex items-center">
              {title ? (
                <h2 className="text-base font-semibold">{title}</h2>
              ) : (
                <span className="text-base font-semibold">Menu</span>
              )}
            </div>
            <div className="flex items-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="p-4">{menu}</div>
            <ThemeToggle />
            <ul className="flex flex-col gap-4">
              {navItems &&
                navItems.length > 0 &&
                navItems.map((item) => (
                  <li key={item.url}>
                    <Button className="w-full" asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </Button>
                  </li>
                ))}
            </ul>
            {data && (
              <div className="flex flex-col gap-4">
                <Button asChild>
                  <Link href="/profile">
                    <UserCircleIcon size={32} />
                    Profile
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
      ) : null}
    </div>
  );
}
