import { NextRequest, NextResponse } from 'next/server';

import { submittedFormPayloadSchema } from '@/features/forms/model/forms.schema';
import { withValidToken } from '@/lib/error/http';
import prisma from '@/lib/prisma';

export const POST = withValidToken(
  async (req: NextRequest, _ctx, { formId, tokenHash }) => {
    const payload = await req.json();

    const validatedPayload = submittedFormPayloadSchema.parse(payload);

    await prisma.$transaction(async (tx) => {
      await tx.formSubmissions.create({
        data: {
          ...validatedPayload,
          formId,
          submitted_at: new Date(),
        },
      });

      await tx.formLink.delete({ where: { tokenHash } });
      await tx.formProgress.delete({
        where: {
          formId_userEmail: { formId, userEmail: validatedPayload.userEmail },
        },
      });
    });

    return NextResponse.json({ ok: true });
  }
);
