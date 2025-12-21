import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

import {
  formItemSchema,
  updateFormSchema,
} from '@/features/forms/forms.schema';
import { NotFoundError } from '@/lib/error/errors';
import { withAuth } from '@/lib/error/http';
import prisma from '@/lib/prisma';

export const GET = withAuth(
  async (
    req: NextRequest,
    ctx: RouteContext<'/api/forms/[id]'>,
    { session }: { session: Session }
  ) => {
    const { id } = await ctx.params;

    const form = await prisma.form.findUnique({
      where: { id, userId: session.user.id },
    });

    const validatedResponse = formItemSchema.parse(form);

    return NextResponse.json(validatedResponse);
  }
);

export const PATCH = withAuth(
  async (
    req: NextRequest,
    ctx: RouteContext<'/api/forms/[id]'>,
    { session }: { session: Session }
  ) => {
    const { id } = await ctx.params;
    const body = await req.json();
    const validatedBody = updateFormSchema.parse(body);

    const updated = await prisma.form.update({
      where: {
        id,
        userId: session.user.id,
      },
      data: {
        ...validatedBody,
        content: validatedBody.content as Prisma.InputJsonValue,
      },
    });

    const validatedResponse = formItemSchema.parse(updated);

    return NextResponse.json(validatedResponse);
  }
);

export const DELETE = withAuth(
  async (
    _req: NextRequest,
    ctx: RouteContext<'/api/forms/[id]'>,
    { session }: { session: Session }
  ) => {
    const { id } = await ctx.params;

    const { count } = await prisma.form.deleteMany({
      where: { id, userId: session.user.id },
    });

    if (count === 0) {
      throw new NotFoundError('Not found');
    }

    return NextResponse.json({ ok: 'success' });
  }
);
