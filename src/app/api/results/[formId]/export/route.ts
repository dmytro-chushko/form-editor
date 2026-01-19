import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

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

    // Використовуємо ті ж фільтри, що і в основній таблиці
    const {
      filters: { email, from, to },
    } = getPaginationAndFilterParams(url, ['email', 'from', 'to']);

    // Перевірка власності форми
    const owns = await prisma.form.findFirst({
      where: { id: formId, userId: session.user.id },
      select: { title: true },
    });

    if (!owns) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    // Отримуємо ВСІ записи без пагінації
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

    // 1. Збираємо всі унікальні ключі з JSON (content) для заголовків колонок
    const dynamicKeys = new Set<string>();
    submissions.forEach((s) => {
      const content = s.content as Record<string, any>;
      Object.keys(content).forEach((k) => dynamicKeys.add(k));
    });

    const headers = ['Email', 'Submitted At', ...Array.from(dynamicKeys)];

    // 2. Формуємо рядки CSV
    const csvRows = [
      headers.join(','), // Заголовки
      ...submissions.map((s) => {
        const content = s.content as Record<string, any>;
        const row = [
          s.userEmail,
          s.submitted_at?.toISOString() || '',
          ...Array.from(dynamicKeys).map((key) => {
            const val = content[key];
            // Екрануємо коми та лапки для CSV
            const strVal = val === null || val === undefined ? '' : String(val);

            return `"${strVal.replace(/"/g, '""')}"`;
          }),
        ];

        return row.join(',');
      }),
    ];

    const csvContent = csvRows.join('\n');
    const fileName = `export-${owns.title.replace(/\s+/g, '_')}-${new Date().toISOString().split('T')[0]}.csv`;

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  }
);
