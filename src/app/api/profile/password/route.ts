import { compare, hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { changePasswordSchema } from '@/features/profile/profile.schema';
import { BadRequestError, ForbiddenError } from '@/lib/error/errors';
import { withAuth } from '@/lib/error/http';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

export const POST = withAuth(async (req: NextRequest, { session }) => {
  const body = await req.json();
  const parsed = changePasswordSchema.parse(body);

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, passwordHash: true },
  });

  if (!user) {
    throw new BadRequestError('User not found');
  }

  if (user.passwordHash) {
    const ok = await compare(parsed.oldPassword, user.passwordHash);

    if (!ok) {
      throw new ForbiddenError('Old password is incorrect');
    }
  }

  const newHash = await hash(parsed.newPassword, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: newHash },
  });

  return NextResponse.json({ ok: true });
});
