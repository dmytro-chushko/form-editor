import { NextResponse } from 'next/server';

import { withErrors } from '@/lib/error/http';
import prisma from '@/lib/prisma';
import { hashToken } from '@/lib/tokens';

export const runtime = 'nodejs';

export const GET = withErrors(async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/profile?emailChanged=0', req.url));
  }

  const tokenHash = hashToken(token);
  const rec = await prisma.emailChange.findFirst({
    where: { tokenHash },
  });

  if (!rec || rec.expiresAt < new Date()) {
    return NextResponse.redirect(new URL('/profile?emailChanged=0', req.url));
  }

  // Ensure email uniqueness
  const existing = await prisma.user.findUnique({
    where: { email: rec.newEmail },
    select: { id: true },
  });

  if (existing) {
    return NextResponse.redirect(
      new URL('/profile?emailChanged=conflict', req.url)
    );
  }

  await prisma.user.update({
    where: { id: rec.userId },
    data: { email: rec.newEmail },
  });
  await prisma.emailChange.delete({ where: { id: rec.id } });

  return NextResponse.redirect(new URL('/profile?emailChanged=1', req.url));
});
