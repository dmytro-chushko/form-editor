import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { withErrors } from '@/lib/http';

export const GET = withErrors(async () => {
  const session = await auth();

  return NextResponse.json({
    user: session?.user ?? null,
  });
});
