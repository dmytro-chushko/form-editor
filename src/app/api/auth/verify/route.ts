import crypto from 'crypto';

import { NextResponse } from 'next/server';

import { withErrors } from '@/lib/http';
import prisma from '@/lib/prisma';

export const GET = withErrors(async (req: Request) => {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const email = url.searchParams.get('email');

  if (!token || !email) {
    return NextResponse.redirect(
      new URL('/auth/verify-failed', process.env.NEXTAUTH_URL)
    );
  }

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  const ev = await prisma.emailVerification.findFirst({
    where: { tokenHash },
  });

  if (!ev || ev.expiresAt < new Date()) {
    return NextResponse.redirect(
      new URL('/auth/verify-failed', process.env.NEXTAUTH_URL)
    );
  }

  await prisma.user.update({
    where: { id: ev.userId },
    data: { emailVerified: true },
  });

  await prisma.emailVerification.delete({ where: { id: ev.id } });

  return NextResponse.redirect(
    new URL('/auth/verify-success', process.env.NEXTAUTH_URL)
  );
});
