import crypto from 'crypto';

import { NextRequest, NextResponse } from 'next/server';

import { createToken, validateToken } from '@/features/forms/lib/token-utils';
import { formTokenSchema } from '@/features/forms/model/form-token.schema';
import { formItemSchema } from '@/features/forms/model/forms.schema';
import { BadRequestError } from '@/lib/error/errors';
import { withErrors } from '@/lib/error/http';
import prisma from '@/lib/prisma';
import { sendSharedFormLink } from '@/lib/resend';

export const GET = withErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const token = searchParams.get('token');

  if (!token) {
    throw new BadRequestError('Invalid token');
  }

  const validatedToken = validateToken(token);

  if (!validatedToken.valid) {
    throw new BadRequestError(validatedToken.error || 'Invalid token');
  }

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  const formLink = await prisma.formLink.findUnique({
    where: { tokenHash },
    include: { form: true },
  });

  if (!formLink) {
    throw new BadRequestError(validatedToken.error || 'Invalid token');
  }

  const validatedResponse = formItemSchema.parse(formLink.form);

  return NextResponse.json(validatedResponse);
});

export const POST = withErrors(async (req: NextRequest) => {
  const payload = await req.json();

  const { userEmail, ...validatedPayload } = formTokenSchema.parse(payload);

  const token = createToken(validatedPayload);
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  await prisma.formLink.create({
    data: {
      userEmail,
      tokenHash,
      form: { connect: { id: validatedPayload.formId } },
    },
  });

  const shareFormLink = `${process.env.NEXTAUTH_URL}/api/forms/sharing?token=${token}`;

  if (userEmail) {
    await sendSharedFormLink(userEmail, shareFormLink);

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ shareFormLink });
});
