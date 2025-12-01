import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { withAuth } from '@/lib/error/http';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

const SESSION_COOKIE_NAME =
  process.env.NODE_ENV === 'production'
    ? '__Secure-next-auth.session-token'
    : 'next-auth.session-token';

export const POST = withAuth(async () => {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await prisma.session.deleteMany({ where: { sessionToken: token } });
    (await cookies()).delete(SESSION_COOKIE_NAME);
  }

  return NextResponse.json({ ok: true });
});
