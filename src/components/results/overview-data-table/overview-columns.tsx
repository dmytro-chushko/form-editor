'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ResultsOverviewItem } from '@/features/results/model/results.schema';

export const columns: ColumnDef<ResultsOverviewItem>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
  },
  {
    accessorKey: 'submissionsCount',
    header: 'Submissions',
  },
];
