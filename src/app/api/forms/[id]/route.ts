import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

import { formItemSchema } from '@/features/forms/forms.schema';
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
