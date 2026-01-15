'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDownIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ResultsOverviewItem } from '@/features/results/model/results.schema';

export const columns: ColumnDef<ResultsOverviewItem>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDownIcon className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created
          <ArrowUpDownIcon className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'submissionsCount',
    header: 'Submissions',
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Button asChild size="sm" variant="outline">
          <Link href={`/dashboard/results/${row.original.id}`}>View</Link>
        </Button>
      );
    },
  },
];
