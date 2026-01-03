import { NextRequest, NextResponse } from 'next/server';

import { submittedFormPayloadSchema } from '@/features/forms/model/forms.schema';
import { withValidToken } from '@/lib/error/http';
import prisma from '@/lib/prisma';

export const POST = withValidToken(
  async (req: NextRequest, _ctx, { formId }) => {
    const payload = await req.json();

    const validatedPayload = submittedFormPayloadSchema.parse(payload);

    await prisma.formSubmissions.create({
      data: {
        ...validatedPayload,
        formId,
        submitted_at: new Date(),
      },
    });

    return NextResponse.json({ ok: true });
  }
);
