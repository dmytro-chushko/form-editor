import { InputJsonValue } from '@prisma/client/runtime/client';
import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

import {
  createFormSchema,
  formItemSchema,
} from '@/features/forms/model/forms.schema';
import { NotFoundError } from '@/lib/error/errors';
import { withAuth } from '@/lib/error/http';
import prisma from '@/lib/prisma';

export const POST = withAuth(
  async (
    _req: NextRequest,
    ctx: RouteContext<'/api/forms/[id]/copy'>,
    { session }: { session: Session }
  ) => {
    const { id } = await ctx.params;

    const original = await prisma.form.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!original) {
      throw new NotFoundError('Not found');
    }

    const validatedData = createFormSchema.parse(original);

    const copy = await prisma.form.create({
      data: {
        userId: session.user.id,
        title: `${validatedData.title} (Copy)`,
        description: validatedData.description ?? null,
        content: validatedData.content as InputJsonValue,
        isPublished: false,
      },
    });

    const validatedResponse = formItemSchema.parse(copy);

    return NextResponse.json(validatedResponse, { status: 201 });
  }
);
