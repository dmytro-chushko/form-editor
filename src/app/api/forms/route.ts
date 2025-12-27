import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

import {
  createFormSchema,
  formItemSchema,
  formListResponse,
} from '@/features/forms/model/forms.schema';
import { withAuth } from '@/lib/error/http';
import prisma from '@/lib/prisma';

export const GET = withAuth(
  async (req: NextRequest, _ctx, { session }: { session: Session }) => {
    const forms = await prisma.form.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
    });

    const validatedResponse = formListResponse.parse(forms);

    return NextResponse.json(validatedResponse);
  }
);

export const POST = withAuth(
  async (req: NextRequest, _ctx, { session }: { session: Session }) => {
    const body = await req.json();
    const validatedPayload = createFormSchema.parse({
      userId: session.user.id,
      title: body.title || 'Untitled',
      description: body.description,
      content: body.content,
    });
    const form = await prisma.form.create({
      data: {
        ...validatedPayload,
        content: validatedPayload.content as Prisma.InputJsonValue,
      },
    });

    const validatedResponse = formItemSchema.parse(form);

    return NextResponse.json(validatedResponse);
  }
);
