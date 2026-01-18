import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ResultsSubFormItem } from '@/features/results/model/results.schema';

export function columns(
  content: (Record<string, unknown> | null)[]
): ColumnDef<Omit<ResultsSubFormItem, 'content'> & (typeof content)[number]>[] {
  return [
    {
      accessorKey: 'userEmail',
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
      accessorKey: 'submittedAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Submitted
            <ArrowUpDownIcon className="ml-2 size-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return row.original.submittedAt ? (
          <span className="text-sm text-muted-foreground">
            {format(row.original.submittedAt, 'do MMMM yyyy')}
          </span>
        ) : (
          <span>-</span>
        );
      },
    },
    ...Object.keys(content[0] || {}).map((item) => ({
      accessorKey: item,
      header: `${item[0].toUpperCase()}${item.slice(1)}`,
    })),
  ];
}
