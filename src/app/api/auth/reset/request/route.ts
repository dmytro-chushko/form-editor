import { NextResponse } from 'next/server';

import { BadRequestError } from '@/lib/errors';
import { withErrors } from '@/lib/http';
import prisma from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/resend';
import { generateResetToken } from '@/lib/tokens';
import { forgotPasswordSchema } from '@/lib/validation/reset';

export const POST = withErrors(async (req: Request) => {
  const body = await req.json();
  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    throw new BadRequestError('Invalid payload');
  }
  const { email } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ ok: true });
  }

  // Optional cooldown: if there is an unexpired token, refuse to create a new one
  const now = new Date();
  const existing = await prisma.passwordReset.findFirst({
    where: { userId: user.id, expiresAt: { gt: now } },
  });

  if (existing) {
    // Still return ok to avoid leaking timing/enum
    return NextResponse.json({ ok: true });
  }

  // Invalidate previous tokens (defensive)
  await prisma.passwordReset.deleteMany({ where: { userId: user.id } });

  const { token, tokenHash } = generateResetToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes

  await prisma.passwordReset.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt,
    },
  });

  const base =
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'http://localhost:3000';
  const resetUrl = `${base}/auth/reset-password?token=${encodeURIComponent(token)}`;
  await sendPasswordResetEmail(email, resetUrl);

  return NextResponse.json({ ok: true });
});
