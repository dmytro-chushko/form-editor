import { redirect } from 'next/navigation';

import Header from '@/components/layouts/Header';
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
      <main className="p-4">{children}</main>
    </>
  );
}
