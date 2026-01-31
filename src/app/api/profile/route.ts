import { NextResponse } from 'next/server';
import { Session } from 'next-auth';

import { withAuth } from '@/lib/error/http';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

export const GET = withAuth(
  async (_req, _ctx, { session }: { session: Session }) => {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
        image: true,
      },
    });

    return NextResponse.json({ user });
  }
);
