import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';
import * as XLSX from 'xlsx';

import { withAuth } from '@/lib/error/http';
import prisma from '@/lib/prisma';
import { getPaginationAndFilterParams } from '@/lib/utils';

export const GET = withAuth(
  async (req: NextRequest, _ctx, { session }: { session: Session }) => {
    const url = new URL(req.url);
    const {
      filters: { title, from, to },
    } = getPaginationAndFilterParams(url, ['title', 'from', 'to']);
    const format = url.searchParams.get('format') === 'csv' ? 'csv' : 'xlsx';

    // Отримуємо ВСІ дані без пагінації для експорту
    const forms = await prisma.form.findMany({
      where: {
        userId: session.user.id,
        title: title ? { contains: title, mode: 'insensitive' } : undefined,
        updatedAt: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
      },
      select: { id: true, title: true, createdAt: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });

    const counts = await prisma.formSubmissions.groupBy({
      by: ['formId'],
      _count: { formId: true },
      where: { formId: { in: forms.map((f) => f.id) } },
    });

    const byId = new Map(counts.map((c) => [c.formId, c._count.formId]));

    // Підготовка даних для Excel
    const dataToExport = forms.map((f) => ({
      'Form Title': f.title,
      Submissions: byId.get(f.id) ?? 0,
      'Created At': f.createdAt.toLocaleDateString(),
      'Last Update': f.updatedAt.toLocaleDateString(),
    }));

    // Генерація файлу за допомогою XLSX
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');

    const bookType = format === 'csv' ? 'csv' : 'xlsx';
    const buf = XLSX.write(workbook, { type: 'buffer', bookType });

    return new NextResponse(buf, {
      headers: {
        'Content-Type':
          format === 'csv'
            ? 'text/csv'
            : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="forms-overview-${new Date().toISOString().split('T')[0]}.${format}"`,
      },
    });
  }
);
