import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

import { BadRequestError } from '@/lib/error/errors';
import { withErrors } from '@/lib/error/http';
import prisma from '@/lib/prisma';
import { hashToken } from '@/lib/tokens';
import { resetPasswordSchema } from '@/lib/validation/reset';

export const POST = withErrors(async (req: Request) => {
  const body = await req.json();
  const parsed = resetPasswordSchema.safeParse(body);

  if (!parsed.success) {
    throw new BadRequestError('Invalid payload');
  }
  const { token, password } = parsed.data;

  const tokenHash = hashToken(token);
  const now = new Date();
  const resetRecord = await prisma.passwordReset.findFirst({
    where: { tokenHash, expiresAt: { gt: now } },
  });

  if (!resetRecord) {
    throw new BadRequestError('Invalid or expired token');
  }

  const passwordHash = await hash(password, 10);

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: resetRecord.userId },
      data: { passwordHash },
    });
    await tx.passwordReset.deleteMany({
      where: { userId: resetRecord.userId },
    });
    await tx.session.deleteMany({ where: { userId: resetRecord.userId } });
  });

  return NextResponse.json({ ok: true });
});
