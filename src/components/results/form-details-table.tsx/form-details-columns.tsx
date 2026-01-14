import { ColumnDef } from '@tanstack/react-table';

import { ResultsSubFormItem } from '@/features/results/model/results.schema';

export function columns(
  content: (Record<string, unknown> | null)[]
): ColumnDef<Omit<ResultsSubFormItem, 'content'> & (typeof content)[number]>[] {
  return [
    {
      accessorKey: 'userEmail',
      header: 'Email',
    },
    {
      accessorKey: 'submittedAt',
      header: 'Submitted',
    },
    ...Object.keys(content[0] || {}).map((item) => ({
      accessorKey: item,
      header: `${item[0].toUpperCase()}${item.slice(1)}`,
    })),
  ];
}
