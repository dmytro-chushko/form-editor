import { NextRequest, NextResponse } from 'next/server';

import { submittedFormPayloadSchema } from '@/features/forms/model/forms.schema';
import { withValidToken } from '@/lib/error/http';
import prisma from '@/lib/prisma';

export const POST = withValidToken(
  async (req: NextRequest, _ctx, { formId, tokenHash }) => {
    const payload = await req.json();

    const validatedPayload = submittedFormPayloadSchema.parse(payload);

    await prisma.formSubmissions.upsert({
      where: {
        formId_userEmail: { formId, userEmail: validatedPayload.userEmail },
      },

      create: {
        ...validatedPayload,
        formId,
        submitted_at: new Date(),
      },
      update: {
        ...validatedPayload,
        submitted_at: new Date(),
      },
    });

    await prisma.formLink.delete({ where: { tokenHash } });

    return NextResponse.json({ ok: true });
  }
);
