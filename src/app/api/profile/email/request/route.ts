import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { requestEmailChangeSchema } from '@/features/profile/profile.schema';
import { withAuth } from '@/lib/error/http';
import prisma from '@/lib/prisma';
import sendVerificationEmail from '@/lib/resend';
import { generateResetToken } from '@/lib/tokens';

export const runtime = 'nodejs';

export const POST = withAuth(async (req: NextRequest, { session }) => {
  const body = await req.json();
  const { newEmail } = requestEmailChangeSchema.parse(body);

  // Idempotent clean previous pending requests
  await prisma.emailChange.deleteMany({ where: { userId: session.user.id } });

  // Create new token
  const { token, tokenHash } = generateResetToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await prisma.emailChange.create({
    data: {
      userId: session.user.id,
      newEmail,
      tokenHash,
      expiresAt,
    },
  });

  const base =
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'http://localhost:3000';
  const verifyUrl = `${base}/api/profile/email/confirm?token=${encodeURIComponent(
    token
  )}`;

  await sendVerificationEmail(newEmail, verifyUrl);

  return NextResponse.json({ ok: true });
});
