import { randomUUID } from 'crypto';

import { compare } from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

const SESSION_COOKIE_NAME =
  process.env.NODE_ENV === 'production'
    ? '__Secure-next-auth.session-token'
    : 'next-auth.session-token';

const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 днів — має збігатися з auth session.maxAge

export const POST = async (req: Request) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email or password missing' },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.passwordHash) {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  }

  if (!user.emailVerified) {
    return NextResponse.json({ error: 'Email not verified' }, { status: 403 });
  }

  const ok = await compare(password, user.passwordHash);

  if (!ok) {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  }

  const sessionToken = randomUUID();
  const expires = new Date(Date.now() + MAX_AGE_SECONDS * 1000);

  await prisma.session.create({
    data: { sessionToken, userId: user.id, expires },
  });

  const cookiesHeaders = await cookies();
  cookiesHeaders.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires,
  });

  return NextResponse.json({ ok: true });
};
