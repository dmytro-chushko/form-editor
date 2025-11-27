import crypto from 'crypto';

import { NextResponse } from 'next/server';

import { ROUTES } from '@/lib/constants/routes';
import { withErrors } from '@/lib/error/http';
import prisma from '@/lib/prisma';

export const GET = withErrors(async (req: Request) => {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const email = url.searchParams.get('email');

  if (!token || !email) {
    return NextResponse.redirect(
      new URL(ROUTES.VerifyFaild, process.env.NEXTAUTH_URL)
    );
  }

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  const ev = await prisma.emailVerification.findFirst({
    where: { tokenHash },
  });

  if (!ev || ev.expiresAt < new Date()) {
    return NextResponse.redirect(
      new URL(ROUTES.VerifyFaild, process.env.NEXTAUTH_URL)
    );
  }

  await prisma.user.update({
    where: { id: ev.userId },
    data: { emailVerified: new Date() },
  });

  await prisma.emailVerification.delete({ where: { id: ev.id } });

  return NextResponse.redirect(
    new URL(ROUTES.VerifySuccess, process.env.NEXTAUTH_URL)
  );
});
