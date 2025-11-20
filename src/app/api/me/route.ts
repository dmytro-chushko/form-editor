import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { withErrors } from '@/lib/http';

export const GET = withErrors(async () => {
  const session = await getServerSession(authOptions);

  return NextResponse.json({
    user: session?.user ?? null,
  });
});
