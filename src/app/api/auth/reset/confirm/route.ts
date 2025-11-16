import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { hashToken } from '@/lib/tokens';
import { resetPasswordSchema } from '@/lib/validation/reset';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const { token, password } = parsed.data;

    const tokenHash = hashToken(token);
    const now = new Date();
    const resetRecord = await prisma.passwordReset.findFirst({
      where: { tokenHash, expiresAt: { gt: now } },
    });

    if (!resetRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    const passwordHash = await hash(password, 10);

    await prisma.$transaction(async (tx) => {
      // Update user password
      await tx.user.update({
        where: { id: resetRecord.userId },
        data: { passwordHash },
      });
      // Delete all password reset tokens for this user
      await tx.passwordReset.deleteMany({
        where: { userId: resetRecord.userId },
      });
      // Invalidate sessions (force re-login)
      await tx.session.deleteMany({ where: { userId: resetRecord.userId } });
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
