import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

import prisma from '@/lib/prisma';

import { withAuth } from '../../../lib/error/http';

export const GET = withAuth(
  async (req: NextRequest, { session }: { session: Session }) => {
    const forms = await prisma.form.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(forms);
  }
);

export const POST = withAuth(
  async (req: NextRequest, { session }: { session: Session }) => {
    const body = await req.json();
    const form = await prisma.form.create({
      data: {
        userId: session.user.id,
        title: body.title || 'Untitled',
        description: body.description || '',
        content: body.content || {},
      },
    });

    return NextResponse.json(form);
  }
);
