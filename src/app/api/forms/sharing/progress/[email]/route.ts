import { NextRequest, NextResponse } from 'next/server';

import {
  submittedFormPayloadSchema,
  submittedFormResSchema,
} from '@/features/forms/model/forms.schema';
import { withValidToken } from '@/lib/error/http';
import prisma from '@/lib/prisma';

export const GET = withValidToken(
  async (
    req: NextRequest,
    ctx: RouteContext<'/api/forms/sharing/progress/[email]'>,
    { formId }
  ) => {
    const { email } = await ctx.params;

    const progress = await prisma.formSubmissions.findUnique({
      where: {
        formId_userEmail: { formId, userEmail: email },
      },
    });

    const validatedProgress = submittedFormResSchema.parse(progress);

    return NextResponse.json(validatedProgress);
  }
);

export const PUT = withValidToken(
  async (
    req: NextRequest,
    ctx: RouteContext<'/api/forms/sharing/progress/[email]'>,
    { formId }
  ) => {
    const { email } = await ctx.params;
    const payload = req.json();

    const validatedPayload = submittedFormPayloadSchema.parse({
      userEmail: email,
      content: payload,
    });

    const progress = await prisma.formSubmissions.upsert({
      where: {
        formId_userEmail: { formId, userEmail: email },
      },
      create: {
        ...validatedPayload,
        formId,
      },
      update: {
        ...validatedPayload,
      },
    });

    const validatedProgress = submittedFormResSchema.parse(progress);

    return NextResponse.json(validatedProgress);
  }
);

export const DELETE = withValidToken(
  async (
    req: NextRequest,
    ctx: RouteContext<'/api/forms/sharing/progress/[email]'>,
    { formId }
  ) => {
    const { email } = await ctx.params;

    await prisma.formSubmissions.delete({
      where: {
        formId_userEmail: { formId, userEmail: email },
      },
    });

    return NextResponse.json({ ok: true });
  }
);
