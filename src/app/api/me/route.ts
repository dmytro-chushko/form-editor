import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { withErrors } from '@/lib/error/http';

export const GET = withErrors(async () => {
  const session = await auth();

  return NextResponse.json({
    user: session?.user ?? null,
  });
});
