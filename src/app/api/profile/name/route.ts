import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Session } from 'next-auth';

import { updateNameSchema } from '@/features/profile/profile.schema';
import { BadRequestError } from '@/lib/error/errors';
import { withAuth } from '@/lib/error/http';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

export const PATCH = withAuth(
  async (req: NextRequest, _ctx, { session }: { session: Session }) => {
    const body = await req.json();
    const parsed = updateNameSchema.parse(body);

    if (!parsed?.firstName && !parsed?.lastName) {
      throw new BadRequestError('Payload did not provide');
    }

    const data: { firstName?: string; lastName?: string } = {};

    if (parsed.firstName) data.firstName = parsed.firstName;

    if (parsed.lastName) data.lastName = parsed.lastName;

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data,
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    return NextResponse.json({ ok: true, user });
  }
);
