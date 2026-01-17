import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';
import z from 'zod';

import {
  createFormSchema,
  formItemSchema,
  getFormListParamsSchema,
} from '@/features/forms/model/forms.schema';
import { withAuth } from '@/lib/error/http';
import prisma from '@/lib/prisma';
import { getPaginationAndFilterParams } from '@/lib/utils';

export const GET = withAuth(
  async (req: NextRequest, _ctx, { session }: { session: Session }) => {
    const url = new URL(req.url);

    const {
      page,
      pageSize,
      filters: { title, from, to },
    } = getPaginationAndFilterParams(url, ['title', 'from', 'to']);

    getFormListParamsSchema.parse({ page, pageSize, title, from, to });

    const where = {
      userId: session.user.id,
      title: title
        ? { contains: title, mode: 'insensitive' as const }
        : undefined,
      updatedAt: {
        gte: from ? new Date(from) : undefined,
        lte: to ? new Date(to) : undefined,
      },
    };

    const [total, forms] = await Promise.all([
      prisma.form.count({ where }),
      prisma.form.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const items = z.array(formItemSchema).parse(forms);

    return NextResponse.json({
      items,
      total,
      page,
      pageSize,
    });
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
