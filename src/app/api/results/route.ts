import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

import {
  resultOverviewParamsSchema,
  resultOverviewResSchema,
  ResultsOverviewItem,
} from '@/features/results/model/results.schema';
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

    resultOverviewParamsSchema.parse({ page, pageSize, title, from, to });

    const baseWhere = {
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
      prisma.form.count({ where: { userId: session.user.id } }),
      prisma.form.findMany({
        where: baseWhere,
        select: { id: true, title: true, createdAt: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    if (forms.length === 0) {
      return NextResponse.json({
        items: [] as ResultsOverviewItem[],
        total,
        page,
        pageSize,
      });
    }

    const counts = await prisma.formSubmissions.groupBy({
      by: ['formId'],
      _count: { formId: true },
      where: {
        formId: { in: forms.map((f) => f.id) },
        submitted_at: { not: null },
      },
    });

    const byId = new Map(counts.map((c) => [c.formId, c._count.formId]));
    const items: ResultsOverviewItem[] = forms.map((f) => ({
      id: f.id,
      title: f.title,
      createdAt: f.createdAt.toISOString(),
      updatedAt: f.updatedAt.toISOString(),
      submissionsCount: byId.get(f.id) ?? 0,
    }));

    const validatedResponse = resultOverviewResSchema.parse({
      items,
      total,
      page,
      pageSize,
    });

    return NextResponse.json(validatedResponse);
  }
);
