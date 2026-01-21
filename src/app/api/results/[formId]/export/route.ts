import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';
import * as XLSX from 'xlsx';

import { withAuth } from '@/lib/error/http';
import prisma from '@/lib/prisma';
import { getPaginationAndFilterParams } from '@/lib/utils';

export const GET = withAuth(
  async (
    req: NextRequest,
    ctx: RouteContext<'/api/results/[formId]'>,
    { session }: { session: Session }
  ) => {
    const { formId } = await ctx.params;
    const url = new URL(req.url);

    const {
      filters: { email, from, to },
    } = getPaginationAndFilterParams(url, ['email', 'from', 'to']);
    const format = url.searchParams.get('format') === 'csv' ? 'csv' : 'xlsx';

    // Перевірка власності форми
    const owns = await prisma.form.findFirst({
      where: { id: formId, userId: session.user.id },
      select: { title: true },
    });

    if (!owns) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    const submissions = await prisma.formSubmissions.findMany({
      where: {
        formId,
        submitted_at: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
        userEmail: email ? { contains: email, mode: 'insensitive' } : undefined,
      },
      orderBy: { submitted_at: 'desc' },
    });

    if (submissions.length === 0) {
      return new NextResponse('No data to export', { status: 400 });
    }

    const dataToExport = submissions.map((s) => ({
      Email: s.userEmail,
      'Submitted At': s.submitted_at?.toLocaleString() || '',
      ...(s.content as Record<string, any>),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');

    const bookType = format === 'csv' ? 'csv' : 'xlsx';
    const buf = XLSX.write(workbook, { type: 'buffer', bookType });

    const fileName = `${owns.title.replace(/\s+/g, '_')}-results.${format}`;

    return new NextResponse(buf, {
      headers: {
        'Content-Type':
          format === 'csv'
            ? 'text/csv'
            : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  }
);
