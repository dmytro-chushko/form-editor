import crypto from 'crypto';

import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

import { BadRequestError, ConflictError } from '@/lib/errors';
import { withErrors } from '@/lib/http';
import prisma from '@/lib/prisma';
import sendVerificationEmail from '@/src/lib/resend';

export const POST = withErrors(async (req: Request) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    throw new BadRequestError('Email or password not provided');
  }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    throw new ConflictError('Email already exists');
  }

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
});
