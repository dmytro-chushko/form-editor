import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

import {
  createFormSchema,
  updateFormSchema,
} from '@/features/forms/forms.schema';
import { withAuth } from '@/lib/error/http';
import prisma from '@/lib/prisma';

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
    const validatedPayload = createFormSchema.parse({
      userId: session.user.id,
      title: body.title || 'Untitled',
      description: body.description,
      content: body.content || {},
    });
    const form = await prisma.form.create({
      data: validatedPayload,
    });

    return NextResponse.json(form);
  }
);

export const PATCH = withAuth(
  async (req: NextRequest, { session }: { session: Session }) => {
    const body = await req.json();
    const data = updateFormSchema.parse(body);

    const updated = await prisma.form.update({
      where: {
        id: data.formaId,
        userId: session.user.id,
      },
      data,
    });

    return NextResponse.json(updated);
  }
);
