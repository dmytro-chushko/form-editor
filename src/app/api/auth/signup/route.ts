import crypto from 'crypto';

import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import sendVerificationEmail from '@/src/lib/resend';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json(
      { error: 'Email or password not provided' },
      { status: 400 }
    );

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing)
    return NextResponse.json(
      { error: 'Email allready exist' },
      { status: 400 }
    );

  const passwordHash = await hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash },
  });

  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

  await prisma.emailVerification.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt,
    },
  });

  const verifyUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;

  await sendVerificationEmail(email, verifyUrl);

  return NextResponse.json({ ok: true });
}
