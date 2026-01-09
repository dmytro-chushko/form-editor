import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

import {
  ResultsSubFormItem,
  ResultsSubFormResponse,
  resultSubFormResSchema,
} from '@/features/results/model/results.schema';
import { withAuth } from '@/lib/error/http';
import prisma from '@/lib/prisma';

export const GET = withAuth(
  async (
    req: NextRequest,
    ctx: RouteContext<'/api/results/[formId]'>,
    { session }: { session: Session }
  ) => {
    const { formId } = await ctx.params;
    const url = new URL(req.url);

    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
    const pageSize = Math.min(
      100,
      Math.max(1, Number(url.searchParams.get('pageSize') ?? '20'))
    );
    const email = url.searchParams.get('email') || undefined;
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');

    const owns = await prisma.form.findFirst({
      where: { id: formId, userId: session.user.id },
      select: { id: true },
    });

    if (!owns) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    const where = {
      formId,
      submitted_at: {
        not: null as any,
        gte: from ? new Date(from) : undefined,
        lte: to ? new Date(to) : undefined,
      },
      userEmail: email
        ? { contains: email, mode: 'insensitive' as const }
        : undefined,
    };

    const [itemsRaw, total] = await Promise.all([
      prisma.formSubmissions.findMany({
        where,
        orderBy: { submitted_at: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          userEmail: true,
          content: true,
          submitted_at: true,
        },
      }),
      prisma.formSubmissions.count({ where }),
    ]);

    const items: ResultsSubFormItem[] = itemsRaw.map((r) => ({
      id: r.id,
      userEmail: r.userEmail,
      submittedAt: r.submitted_at ? r.submitted_at.toISOString() : null,
      content: (r.content as any) ?? null,
    }));

    const validatedResponse = resultSubFormResSchema.parse({
      items,
      total,
      page,
      pageSize,
    });

    return NextResponse.json<ResultsSubFormResponse>(validatedResponse);
  }
);
