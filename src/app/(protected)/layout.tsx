import { redirect } from 'next/navigation';

import { AppSidebar } from '@/components/app-sidebar/ui/app-sidebar';
import Header from '@/components/layouts/Header';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { ROUTES } from '@/lib/constants/routes';

export default async function DashbordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect(ROUTES.SignIn);
  }

  return (
    <>
      <Header title="Form Builder" />

      <SidebarProvider className="min-h-[calc(100svh-var(--header-height))] ">
        <AppSidebar />
        <main className="p-4 min-w-0 grow">
          <SidebarTrigger className="hidden md:block" />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
