import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { ROUTES } from '@/lib/constants/routes';

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect(ROUTES.SignIn);
  }

  return redirect(ROUTES.Dashboard);
}
